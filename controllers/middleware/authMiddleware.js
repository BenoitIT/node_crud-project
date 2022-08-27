const jwt = require("jsonwebtoken");
const authmiddleware = async(req, res, next) => {
    const JWT_SECRET = "weneverknowhowthesituationis"
    const token = req.header("Authorization")
    if (!token) {
        return res.status(401).json({
            message: "access denied for anouthorized access"
        })
    }
    try {
        const finalToken = await token.split(' ')[1]
        const decorded = await jwt.verify(finalToken, JWT_SECRET)
        req.authuser = decorded
        next()
    } catch (ex) {
        return res.status(400).json({
            message: "invalid token"
        })

    }

}
module.exports = { authmiddleware }