import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  console.log("Verify Token", req.headers);
  const token = req.headers['authorization'].split(" ")[1];
  console.log("token",token);
  if (!token) return res.status(403).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};


