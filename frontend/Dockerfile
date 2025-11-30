FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY vite.config.ts ./
COPY svelte.config.js ./
COPY tsconfig.json ./
COPY .env ./

RUN npm ci

COPY src/ ./src/
COPY static/ ./static/

RUN npm run build

FROM nginx:alpine AS production

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]