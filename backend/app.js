// app.js
import express from 'express';
const app = express();

// middleware, routes etc.

app.get('/', (req, res) => {
    res.send('API is running...');
  });
  

export default app;
