const jwt = require("jsonwebtoken");
const JSON_SEC = process.env.JSON_SECRET;

const verifyAdmin = (req, res, next) => {
    const token = req.header['authorization']?.split(' ')[1];
    if(!token) {
        return res.status(401).send({
            message: 'Access denied',
        })
    }
    jwt.verify(token, JSON_SEC, (err, user) => {
        if (err) {
            return res.status(403).send({
                message: 'Invalid credit'
            })
        }
        req.user = user;
        next();
    })
}
module.exports = verifyAdmin