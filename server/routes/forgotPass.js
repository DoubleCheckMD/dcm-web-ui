import express from 'express';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../lib/db.js';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_SECRET = process.env.EMAIL_SECRET;

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route to handle "Forgot Password" request
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const token = jwt.sign({ email }, EMAIL_SECRET, { expiresIn: '1h' });
    const resetLink = `http://localhost:5173/reset-password/${token}`;

    // Send email with reset link
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      text: `Click the link to reset your password: ${resetLink}`,
    });

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Route to handle password reset
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  const updatedDate = new Date();

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const decoded = jwt.verify(token, EMAIL_SECRET);
    const email = decoded.email;

         const hashPassword = await bcrypt.hash(newPassword, 10)
 
    const connection = await connectToDatabase();
    await connection.execute('UPDATE users SET password = ?, updatedDate = ? WHERE email = ?', [hashPassword, updatedDate, email]);

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error('Error while resetting password:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;