FROM node:20-alpine

WORKDIR /app

# Bỏ qua package-lock.json để tránh OS mismatch
COPY package.json ./
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Mở cổng server
EXPOSE 5000

# Khởi chạy server
CMD ["npm", "start"]
