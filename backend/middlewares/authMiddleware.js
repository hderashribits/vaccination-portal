import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ error: 'Unauthorized: Token missing' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== 'admin')
      return res.status(403).json({ error: 'Forbidden: Admins only' });

    req.user = decoded; // Add user info to request object
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized: Token expired' });
    }
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
