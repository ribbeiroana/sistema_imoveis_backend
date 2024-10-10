import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.json({ message: 'Não autorizado' }, 401)
  }

  const token = authorization.replace('Bearer', '').trim();
  try {
    const data = jwt.verify(token, '698dc19d489c4e4db73e28a713eab07b');
    const { id } = data;
    req.usersId = id;

    return next();
  } catch {
    return res.json({ message: 'Não autorizado' }, 401)

  }

} 