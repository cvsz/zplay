# Deployment Guide

## Build for Production

```bash
make build
```

This produces static files in `dist/`:

```
dist/
├── index.html
└── assets/
    ├── index-*.css
    └── index-*.js
```

## Deploy Options

### Vercel

```bash
make deploy-vercel
```

Or connect your GitHub repository to Vercel for automatic deployments on push.

### Netlify

```bash
make deploy-netlify
```

Or connect your GitHub repository to Netlify for automatic deployments on push.

### GitHub Pages

```bash
make deploy-ghpages
```

### Any Static Host

Upload the contents of `dist/` to your web server or static hosting provider.

## Docker Deployment

```bash
docker build -t zplay-slot-suite .
docker run -p 80:80 zplay-slot-suite
```

## Environment Variables

Copy `.env.example` to `.env` and customize:

```bash
cp .env.example .env
```

Edit `.env` with your deployment-specific values. Never commit `.env` to version control.
