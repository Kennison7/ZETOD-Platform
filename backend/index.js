const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ 
      message: 'ZeToD API is live!',
          status: 'running'
            });
            });

            // Health check
            app.get('/health', (req, res) => {
              res.json({ status: 'healthy' });
              });

              app.listen(PORT, () => {
                console.log(`ZeToD server running on port ${PORT}`);
                });
                module.exports = app;