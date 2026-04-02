const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDB() {
  // Kết nối không có database để tạo database trước
  const tempConn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '18004huyhio',
  });

  // Tạo database nếu chưa có
  await tempConn.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'movieflix_db'}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
  );
  await tempConn.query(`USE \`${process.env.DB_NAME || 'movieflix_db'}\`;`);

  // Tạo bảng users
  await tempConn.query(`
    CREATE TABLE IF NOT EXISTS users (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      name        VARCHAR(100)  NOT NULL,
      email       VARCHAR(150)  NOT NULL UNIQUE,
      password    VARCHAR(255)  NOT NULL,
      role        ENUM('user','admin') DEFAULT 'user',
      avatar      VARCHAR(500)  DEFAULT NULL,
      created_at  DATETIME      DEFAULT CURRENT_TIMESTAMP,
      updated_at  DATETIME      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  console.log('✅ Database & tables initialized!');
  await tempConn.end();
}

module.exports = initDB;
