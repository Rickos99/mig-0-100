# Stage 1, Build
FROM node:18.17-alpine AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY rollup.config.js ./
COPY svelte.config.js ./
COPY tsconfig.json ./
COPY src/ ./src/
COPY public ./public/

RUN npm run build

# Stage 2, Copy files to httpd
FROM httpd:2.4-alpine

COPY --from=build ./app/public/ /usr/local/apache2/htdocs/
