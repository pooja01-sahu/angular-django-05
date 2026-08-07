# ---------- Stage 1: Build Angular app ----------
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration=production

# ---------- Stage 2: Serve with Nginx (default config) ----------
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

ARG APP_NAME=python-project05
COPY --from=build /app/dist/${APP_NAME}/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
