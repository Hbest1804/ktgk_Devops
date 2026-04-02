# Bước 1: build
FROM node:20-alpine as build

WORKDIR /app

# CHÚ Ý: Bắt buộc CHỈ copy package.json, không được có package*.json để tránh lỗi Native Binding Windows đè lên Linux
COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

# Bước 2: chạy nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]