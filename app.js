// app.js
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const api = require('./api');
const db = require('./db');

const app = express();

// middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api', api);

// basic health
app.get('/', (req, res) => res.send('is-5600-week-05 - products service'));

// error handler
app.use((err, req, res, next) => {
  console.error(err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
    });

    const PORT = process.env.PORT || 3000;

    db.connect().then(() => {
      app.listen(PORT, '0.0.0.0', () => {
          console.log(`Server listening on port ${PORT}`);
            });
            }).catch(err => {
              console.error('Failed to start server due to DB error:', err);
              });
