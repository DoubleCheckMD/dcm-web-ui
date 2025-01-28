
// filepath: /d:/code/APP/server/middleware/auth.js
import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(403).json({message: "No Token Provided"});
        }
        const token = authHeader.split(' ')[1];

        if(!token) {
            return res.status(403).json({message: "No Token Provided"})
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        console.log('Decoded token:', decoded); // Debug log to check the decoded token
        req.userId = decoded.id;
        next()
    }  catch(err) {
        return res.status(500).json({message: "server error"})
    }
}

export default verifyToken;