import * as AuthService from '../../services/AuthService.js';
import User from '../../models/User.js';
import mongoose from 'mongoose';

describe('AuthService', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_TEST_URI || 'mongodb://localhost:27017/simplified_test');
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('registerUser', () => {
    it('should register a new user with hashed password', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      const user = await AuthService.registerUser(userData);

      expect(user.email).toBe(userData.email);
      expect(user.username).toBe(userData.username);
      expect(user.password).not.toBe(userData.password); 
    });

    it('should throw error for duplicate email', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      await AuthService.registerUser(userData);

      await expect(AuthService.registerUser(userData))
        .rejects.toThrow('Email already in use');
    });
  });

  describe('loginUser', () => {
    beforeEach(async () => {
      await AuthService.registerUser({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
    });

    it('should login with valid credentials', async () => {
      const result = await AuthService.loginUser('test@example.com', 'password123');

      expect(result.token).toBeDefined();
      expect(result.user.email).toBe('test@example.com');
    });

    it('should throw error for invalid credentials', async () => {
      await expect(AuthService.loginUser('test@example.com', 'wrongpassword'))
        .rejects.toThrow('Invalid credentials');
    });
  });
});