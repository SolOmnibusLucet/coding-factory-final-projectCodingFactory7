import { body, validationResult } from 'express-validator';
import * as AuthService from '../services/AuthService.js';

export const register = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password } = req.body;
      const user = await AuthService.registerUser({ username, email, password });
      
      res.status(201).json({ 
        message: 'User created successfully',
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      if (error.message === 'Email already in use') {
        return res.status(409).json({ message: error.message });
      }
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
];

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.loginUser(email, password);
    
    res.json(result);
  } catch (error) {
    if (error.message === 'Invalid credentials') {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};