const jwt=require('jsonwebtoken')


function verifyToken(roles) {
    return (req, res, next) => {
     // Bearer <token>
     const token = req.headers.authorization
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const splitedToken= token.split(" ")[1]; 
      jwt.verify(splitedToken, 'secretKey', { algorithms: ['HS256'] }, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
        }
  
        if (roles && !roles.includes(decoded.role)) {
          return res.status(403).json({ message: 'Forbidden' });
        }
  
        req.user = decoded;
        next();
      });
    };
  }
  
module.exports={verifyToken}