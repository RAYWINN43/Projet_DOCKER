# Build Caddy avec le plugin Cloudflare
FROM caddy:2-builder AS builder
RUN xcaddy build \
  --with github.com/caddy-dns/cloudflare

# Image finale
FROM caddy:2
COPY --from=builder /usr/bin/caddy /usr/bin/caddy
