import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_secret_key';

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
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
