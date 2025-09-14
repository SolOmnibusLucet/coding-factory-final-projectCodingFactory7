import express from 'express';
import { register, login } from '../controllers/authController.js';
import { registerSchema } from '../dto/RegisterDTO.js';
import { loginSchema } from '../dto/LoginDTO.js';

const router = express.Router();

const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);

export default router;
