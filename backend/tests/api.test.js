const request = require('supertest');
const app = require('../index.js');

describe('ZeToD API Tests', () => {

  test('GET / returns ZeToD API is live', async () => {
      const res = await request(app).get('/');
          expect(res.statusCode).toBe(200);
              expect(res.body.message).toBe('ZeToD API is live!');
                });

                  test('GET /health returns healthy status', async () => {
                      const res = await request(app).get('/health');
                          expect(res.statusCode).toBe(200);
                              expect(res.body.status).toBe('healthy');
                                });

                                  test('GET /nonexistent returns 404', async () => {
                                      const res = await request(app).get('/nonexistent');
                                          expect(res.statusCode).toBe(404);
                                            });

                                            });