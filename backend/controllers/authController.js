import dotenv from 'dotenv';
dotenv.config(); 
import jwt from 'jsonwebtoken';

const ADMIN_EMAIL = 'admin@school.com';
const ADMIN_PASSWORD = 'admin123';
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '2h';

export const login = (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
};
