const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDB() {
  // Connect without database initially to create it if it doesn't exist
  const tempConn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  const dbName = process.env.DB_NAME || 'movieflix_db';

  // Create database if not exists
  await tempConn.query(
    `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
  );
  await tempConn.query(`USE \`${dbName}\`;`);

  // Create users table
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
