# ZPlay Slot Suite - Production Dockerfile
# Multi-stage: build with Vite, serve with NGINX

FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy source and build
COPY . .
RUN npm run build

# Production stage: serve static files with NGINX
FROM nginx:1.27-alpine AS runtime

LABEL maintainer="maintainers@example.com"
LABEL description="ZPlay Slot Suite - 6-game Pragmatic Play style slot machine"

WORKDIR /usr/share/nginx/html

# Remove default NGINX static assets
RUN rm -rf ./*

# Copy built static assets from builder stage
COPY --from=builder /app/dist/ ./

# Add security headers configuration
RUN echo 'add_header X-Frame-Options "SAMEORIGIN" always;' >> /etc/nginx/conf.d/default.conf && \
    echo 'add_header X-Content-Type-Options "nosniff" always;' >> /etc/nginx/conf.d/default.conf && \
    echo 'add_header Referrer-Policy "no-referrer-when-downgrade" always;' >> /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
