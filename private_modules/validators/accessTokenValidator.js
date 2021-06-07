const jwt = require('jsonwebtoken');
const tokenSecret = 'my-token-secret';

function generateToken(user){
    return jwt.sign({data: user}, tokenSecret);
};

function verifyToken(req, res, next){
    const token = req.header('Authorization');
    if(token){
        if(token.startsWith("Bearer ")){
            const tokenSplited = token.split(" ");
            try {
                jwt.verify(tokenSplited[1], tokenSecret);
                next();
            } catch (error) {
                res.status(401).json({ message: 'Unauthorized'});
            }
        }else {
            res.status(401).json({ message: 'Unauthorized'});
        }
    } else {
        res.status(401).json({ message: 'Unauthorized'});
    };
};

module.exports = {
    verifyToken,
    generateToken
}
