let jwt = require('jsonwebtoken')


let verifyToken = async (req,res)=>{
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ auth: false });
    
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        res.json({ auth: true, user: decoded });
    } catch (e) {
        res.status(401).json({ auth: false, message: 'Invalid token' });
    }
}

module.exports = {verifyToken};