const request = require('supertest');
const app = require('../index'); // points to backend/index.js

describe('Auth Endpoints - Week 3', () => {
  let testEmail = `test${Date.now()}@example.com`;
  let validToken = null;

  // 1. Register valid user → expect 200 and token
  test('POST /api/auth/register valid → 200 + token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: testEmail, password: '12345678' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    validToken = res.body.token;
  });

  // 2. Register duplicate email → expect 400
  test('POST /api/auth/register duplicate email → 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: testEmail, password: '12345678' });
    expect(res.statusCode).toBe(400);
  });

  // 3. Register invalid email format → expect 400
  test('POST /api/auth/register invalid email → 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'notanemail', password: '12345678' });
    expect(res.statusCode).toBe(400);
  });

  // 4. Login valid credentials → expect 200 and token
  test('POST /api/auth/login valid → 200 + token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testEmail, password: '12345678' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  // 5. Login wrong password → expect 401
  test('POST /api/auth/login wrong password → 401', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testEmail, password: 'wrongpass' });
    expect(res.statusCode).toBe(401);
  });

  // 6. Protected route without token → expect 401 (commented out until Kennison adds the route)
   test('GET /api/protected-route no token → 401', async () => {
     const res = await request(app).get('/api/protected-route');
     expect(res.statusCode).toBe(401);
   });

  // 7. Protected route with valid token → expect 200 (commented out until Kennison adds the route)
   test('GET /api/protected-route with token → 200', async () => {
     const res = await request(app)
       .get('/api/protected-route')
       .set('Authorization', `Bearer ${validToken}`);
     expect(res.statusCode).toBe(200);
   });
});