const express = require('express');
const cors = require('cors');
require('dotenv').config();

const initDB = require('./config/initDB');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ─────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);

// Health check (/health)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Trang thông tin cá nhân (/about)
app.get('/about', async (req, res) => {
  try {
    const pool = require('./config/db');
    const [rows] = await pool.query('SELECT name, student_id, class_name FROM users ORDER BY id DESC LIMIT 1');
    if (rows.length > 0) {
      res.json({
        "Họ tên sinh viên": rows[0].name,
        "Mã số sinh viên": rows[0].student_id || "Chưa nhập",
        "Lớp": rows[0].class_name || "Chưa nhập"
      });
    } else {
      res.json({
        "Họ tên sinh viên": "Chưa có sinh viên đăng ký",
        "Mã số sinh viên": "N/A",
        "Lớp": "N/A"
      });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} không tồn tại` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Lỗi server nội bộ' });
});

// ─── Khởi động server ───────────────────────────────────────────────────────
async function startServer() {
  try {
    // Khởi tạo database & bảng trước khi lắng nghe
    await initDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
      console.log(`📋 API Auth: http://localhost:${PORT}/api/auth`);
    });
  } catch (err) {
    console.error('❌ Không thể khởi động server:', err.message);
    process.exit(1);
  }
}

startServer();
