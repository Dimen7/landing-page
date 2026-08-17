# syntax=docker/dockerfile:1

# Build stage
FROM node:26.7.0-alpine AS builder

# pnpm via the official standalone script; the version is read from the
# "packageManager" field so the image and CI always run the same pnpm.
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"

WORKDIR /app

# Install pnpm first (only needs package.json to read the pinned version)
COPY package.json ./
RUN apk add --no-cache bash \
    && export PNPM_VERSION="$(sed -n 's/.*"packageManager": *"pnpm@\([^"]*\)".*/\1/p' package.json)" \
    && test -n "$PNPM_VERSION" \
    && wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash - \
    && pnpm config set store-dir /pnpm-store --global

# Install dependencies (cached via the shared pnpm store)
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm-store,sharing=locked \
    pnpm install --frozen-lockfile

# Copy all files
COPY . .

# Use .env.example as a fallback for build time if .env is missing.
# This prevents build errors with $env/static/public, while actual values
# are provided at runtime via env_file in docker-compose.
RUN if [ ! -f .env ]; then cp .env.example .env; fi

# Build the SvelteKit app
RUN pnpm run build

# Remove development dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm-store,sharing=locked \
    pnpm prune --prod

# Run stage
FROM node:26.7.0-alpine

WORKDIR /app

# Copy the build output and necessary files
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Default port for adapter-node is 3000
ENV PORT=3000
EXPOSE 3000

# Start the application
CMD ["node", "build/index.js"]
