-- Tạo database (nếu chưa có) và sử dụng nó
CREATE DATABASE IF NOT EXISTS `movieflix_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `movieflix_db`;

-- Xóa bảng cũ nếu tồn tại (cẩn thận mất dữ liệu khi chạy dòng này)
-- DROP TABLE IF EXISTS `users`;

-- Tạo bảng users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `avatar` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Thêm một tài khoản admin mặc định (Tùy chọn) 
-- Pass: 123456
-- INSERT INTO `users` (`name`, `email`, `password`, `role`) VALUES
-- ('Admin MovieFlix', 'admin@movieflix.com', '$2y$12$Z0tT1P6yQ/M5wXXiT2vV..14V35v.0Qd3L.eM2I9U5Z6zI8H8F7m.', 'admin');

