
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(limiter);

app.use('/api/auth', authLimiter, authRoutes);
const authMiddleware = require('./middleware/auth');

app.get('/api/protected-route', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Access granted' });
  });

app.get('/', (req, res) => {
  res.json({ message: 'ZeToD API is live!', status: 'running' });
  });

  app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
    });

    app.use((err, req, res, next) => {
      console.error(err.stack);
        res.status(500).json({ error: 'Something went wrong' });
        });

        app.listen(PORT, () => {
          console.log(`ZeToD server running on port ${PORT}`);
          });

          module.exports = app;