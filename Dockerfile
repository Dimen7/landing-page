# Build stage
FROM node:25.9.0-alpine AS builder

WORKDIR /app

# Install dependencies first (for caching)
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Use .env.example as a fallback for build time if .env is missing.
# This prevents build errors with $env/static/public, while actual values
# are provided at runtime via env_file in docker-compose.
RUN if [ ! -f .env ]; then cp .env.example .env; fi

# Build the SvelteKit app
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Run stage
FROM node:25.9.0-alpine

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
