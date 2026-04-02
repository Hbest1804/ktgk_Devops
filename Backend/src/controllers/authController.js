const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// ─── Helper sinh JWT ────────────────────────────────────────────────────────
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// ─── ĐĂNG KÝ ────────────────────────────────────────────────────────────────
/**
 * POST /api/auth/register
 * Body: { name, email, password }
 */
const register = async (req, res) => {
  try {
    const { name, email, password, student_id, class_name } = req.body;

    // Validate đầu vào
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Mật khẩu phải có ít nhất 6 ký tự' });
    }

    // Kiểm tra email đã tồn tại chưa
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'Email đã được sử dụng' });
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 12);

    // Tạo user mới
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, student_id, class_name) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), email.toLowerCase().trim(), hashedPassword, student_id || null, class_name || null]
    );

    const newUser = {
      id: result.insertId,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      student_id: student_id || null,
      class_name: class_name || null,
      role: 'user',
    };

    const token = generateToken(newUser);

    return res.status(201).json({
      success: true,
      message: 'Đăng ký thành công!',
      token,
      user: newUser,
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server, thử lại sau' });
  }
};

// ─── ĐĂNG NHẬP ──────────────────────────────────────────────────────────────
/**
 * POST /api/auth/login
 * Body: { email, password }
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate đầu vào
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập email và mật khẩu' });
    }

    // Tìm user theo email
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không đúng' });
    }

    const user = rows[0];

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không đúng' });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        student_id: user.student_id,
        class_name: user.class_name,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server, thử lại sau' });
  }
};

// ─── LẤY THÔNG TIN NGƯỜI DÙNG HIỆN TẠI ─────────────────────────────────────
/**
 * GET /api/auth/me  (cần token)
 */
const getMe = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, student_id, class_name, role, avatar, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
    }
    return res.status(200).json({ success: true, user: rows[0] });
  } catch (err) {
    console.error('GetMe error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};

// ─── CẬP NHẬT PROFILE ────────────────────────────────────────────────────────
/**
 * PUT /api/auth/profile  (cần token)
 * Body: { name, avatar }
 */
const updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Tên không được để trống' });
    }

    await pool.query('UPDATE users SET name = ?, avatar = ? WHERE id = ?', [name.trim(), avatar || null, userId]);

    const [rows] = await pool.query(
      'SELECT id, name, email, role, avatar FROM users WHERE id = ?',
      [userId]
    );

    return res.status(200).json({ success: true, message: 'Cập nhật thành công!', user: rows[0] });
  } catch (err) {
    console.error('UpdateProfile error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};

// ─── ĐỔI MẬT KHẨU ────────────────────────────────────────────────────────────
/**
 * PUT /api/auth/change-password  (cần token)
 * Body: { currentPassword, newPassword }
 */
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Mật khẩu mới phải có ít nhất 6 ký tự' });
    }

    const [rows] = await pool.query('SELECT password FROM users WHERE id = ?', [userId]);
    const isMatch = await bcrypt.compare(currentPassword, rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Mật khẩu hiện tại không đúng' });
    }

    const hashedNew = await bcrypt.hash(newPassword, 12);
    await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedNew, userId]);

    return res.status(200).json({ success: true, message: 'Đổi mật khẩu thành công!' });
  } catch (err) {
    console.error('ChangePassword error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};

module.exports = { register, login, getMe, updateProfile, changePassword };
