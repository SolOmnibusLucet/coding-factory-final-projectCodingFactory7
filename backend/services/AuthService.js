import * as UserRepository from '../repositories/UserRepository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (userData) => {
 
  const existingUser = await UserRepository.getUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  
  return await UserRepository.registerUser({
    ...userData,
    password: hashedPassword
  });
};

export const loginUser = async (email, password) => {
  const user = await UserRepository.getUserByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }
  
  const token = jwt.sign(
    { id: user._id }, 
    process.env.JWT_SECRET, 
    { expiresIn: '24h' }
  );
  
  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  };
};