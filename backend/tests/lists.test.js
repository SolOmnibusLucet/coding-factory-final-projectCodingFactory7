import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';
import User from '../models/User.js';
import List from '../models/List.js';

describe('Lists', () => {
  let authToken;
  let userId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_TEST_URI || 'mongodb://localhost:27017/simplified_test');
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await List.deleteMany({});

    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    authToken = loginResponse.body.token;
    userId = loginResponse.body.user.id;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /api/lists', () => {
    it('should create a new list', async () => {
      const listData = {
        title: 'Test List',
        category: 'Work'
      };

      const response = await request(app)
        .post('/api/lists')
        .set('Authorization', `Bearer ${authToken}`)
        .send(listData)
        .expect(201);

      expect(response.body.title).toBe(listData.title);
      expect(response.body.category).toBe(listData.category);
      expect(response.body.userId).toBe(userId);
    });

    it('should not create list without authentication', async () => {
      const listData = {
        title: 'Test List',
        category: 'Work'
      };

      await request(app)
        .post('/api/lists')
        .send(listData)
        .expect(403);
    });

    it('should not create list without title', async () => {
      const listData = {
        category: 'Work'
      };

      await request(app)
        .post('/api/lists')
        .set('Authorization', `Bearer ${authToken}`)
        .send(listData)
        .expect(400);
    });
  });

  describe('GET /api/lists', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/lists')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'List 1', category: 'Work' });

      await request(app)
        .post('/api/lists')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'List 2', category: 'Personal' });
    });

    it('should get user lists', async () => {
      const response = await request(app)
        .get('/api/lists')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].title).toBeDefined();
    });

    it('should not get lists without authentication', async () => {
      await request(app)
        .get('/api/lists')
        .expect(403);
    });
  });
});