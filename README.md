# landing-page

A modern, high-performance personal landing page built with SvelteKit, TypeScript, and Three.js. This project is highly customizable via environment variables and includes a production-ready Docker configuration.

## Fork Information

This project is a fork of the original [osumatrix.me](https://github.com/oSumAtrIX/osumatrix.me) by oSumAtrIX. It has been adapted to use the SvelteKit Node adapter for better support of runtime environment variables in Docker environments.

## Features

- Interactive WebGL Cursor: Custom GPU-accelerated cursor trail using Three.js and GLSL.
- Dynamic Theming: Configuration of colors, fonts, and layouts via environment variables.
- Social Link Mapping: Automatic generation of social icons based on env var naming conventions.
- Responsive Design: Optimized for mobile, tablet, and desktop viewports.
- Visual Effects: Glassmorphism and blur effects with high-quality visual feedback.
- Docker Integration: Multi-stage Dockerfile and Docker Compose setup.

## Tech Stack

- Framework: SvelteKit (Svelte 5)
- Styling: SCSS, CSS Custom Properties
- Graphics: Three.js (Custom Shaders)
- Icons: Font Awesome
- Deployment: Node.js (Adapter-Node), Docker

---

## Getting Started

### Prerequisites

- Node.js (>= 20.x, recommended: 25.9.0)
- npm

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd landing-page
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   Copy the example environment file and adjust the values:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   Access the site at http://localhost:5173.

---

## Docker Deployment

The project uses a multi-stage Docker build and the SvelteKit Node adapter.

1. Start the container:
   ```bash
   docker compose up -d
   ```

2. Access the application:
   The site is served at http://localhost:3000.

3. Rebuilding after configuration changes:
   Since SvelteKit inlines static environment variables (PUBLIC_*) during the build, you must rebuild the image after changing these values in your .env file:
   ```bash
   docker compose up -d --build
   ```

---

## Configuration

Personalization is handled exclusively through .env variables.

### General Information
| Variable | Description | Default/Example |
| :--- | :--- | :--- |
| PUBLIC_NAME | Your name or handle (main title) | John Doe |
| PUBLIC_DESCRIPTION | Meta description for SEO | My personal portfolio |
| PUBLIC_THEME_COLOR | Mobile browser status bar color | #000000 |
| PUBLIC_IMAGE | URL for profile image | (Auto-generated avatar) |
| PUBLIC_FAVICON | URL for favicon | (Auto-generated favicon) |

### Theme & Colors (CSS)
| Variable | Description | Default/Example |
| :--- | :--- | :--- |
| PUBLIC_COLOR_WHITE | Main text color | #cccccc |
| PUBLIC_COLOR_GRAY | Secondary color (scrollbars, etc.) | #333333 |
| PUBLIC_COLOR_HIGHLIGHT | Accent and cursor glow color | #ff0052 |
| PUBLIC_COLOR_BG | Main background color | #060606 |

### Visual Effects & Cursor
| Variable | Description | Default/Example |
| :--- | :--- | :--- |
| PUBLIC_CURSOR_NOISE_URL | Texture for cursor trail noise | (S3 URL) |
| PUBLIC_CURSOR_DIVISOR | Cursor trail follow speed (0.0-1.0) | 0.2 |
| PUBLIC_BG_VIDEO_ID | Optional YouTube Video ID | dQw4w9WgXcQ |
| PUBLIC_BG_VIDEO_BLUR | Blur intensity for video (px) | 8 |
| PUBLIC_BG_VIDEO_VOLUME | Initial video volume (0-100) | 50 |

### Localization & Bio
| Variable | Description | Default/Example |
| :--- | :--- | :--- |
| PUBLIC_BIO | Your main introduction text | I am a software engineer... |
| PUBLIC_LOCATION | Your physical location | the Internet |
| PUBLIC_BIRTHDAY | Your birthday (YYYY-MM-DD) | 2000-01-01 |
| PUBLIC_AGE_SUFFIX | Text after age | years old |
| PUBLIC_LOCALE | Locale for date formatting | en-US |
| PUBLIC_TIMEZONE | Timezone for the clock | UTC |

### Social Media Links

Define social links by using the `PUBLIC_SOCIAL_` prefix followed by an icon name (e.g., GITHUB, DISCORD, X, ENVELOPE). Icons are automatically mapped via Font Awesome.

**A full list of supported icon identifiers can be found in [SOCIALS.md](./SOCIALS.md).**

```env
PUBLIC_SOCIAL_GITHUB="https://github.com/example"
PUBLIC_SOCIAL_DISCORD="https://discord.com"
```

---

## Available Scripts

- npm run dev: Start development server.
- npm run build: Build the application for production.
- npm run preview: Preview the production build locally.
- npm run check: Run Svelte and TypeScript diagnostic checks.
- npm run lint: Run ESLint and Prettier checks.
- npm run format: Auto-format the codebase.

## License

This project is licensed under the [MIT License](LICENSE).
