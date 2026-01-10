# Stream Linkify Frontend

A music link sharing tool that converts Spotify or Apple Music links into shareable links across multiple streaming platforms.

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **Cross-platform link conversion** — Paste a track or album link from Spotify or Apple Music and get links for Spotify, Apple Music, Deezer, Tidal, and more.
- **Dynamic theming** — The UI automatically extracts the dominant color from album artwork and uses it as the accent color throughout the interface.
- **OKLCH color space** — Color extraction uses perceptually uniform OKLCH for more vibrant, accurate accent colors.
- **Light/Dark/System theme** — Respects user preference with manual override.

## Tech Stack

- React + TypeScript
- [culori](https://culorijs.org/) for color conversion
- Bun

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- Backend API running (see [stream-linkify-backend](https://github.com/jprkindrid/stream-linkify-backend))

### Installation

```bash
git clone https://github.com/jprkindrid/stream-linkify-frontend.git
cd stream-linkify-frontend
bun install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:5000
```

### Development

```bash
bun dev
```

## Roadmap

- [ ] Loading states
- [ ] Error handling UI
- [ ] More streaming platforms
- [ ] Deployment

## License

MIT