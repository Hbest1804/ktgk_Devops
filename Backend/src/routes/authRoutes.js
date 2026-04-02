const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
} = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

// ─── Public routes ──────────────────────────────────────────────────────────
// POST /api/auth/register  → Đăng ký tài khoản mới
router.post('/register', register);

// POST /api/auth/login  → Đăng nhập
router.post('/login', login);

// ─── Protected routes (cần JWT) ────────────────────────────────────────────
// GET /api/auth/me  → Lấy thông tin user hiện tại
router.get('/me', authMiddleware, getMe);

// PUT /api/auth/profile  → Cập nhật tên, avatar
router.put('/profile', authMiddleware, updateProfile);

// PUT /api/auth/change-password  → Đổi mật khẩu
router.put('/change-password', authMiddleware, changePassword);

module.exports = router;
