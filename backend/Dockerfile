FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY package-lock*.json ./

RUN npm ci

COPY src/ ./src/
COPY nest-cli.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]