const Admin = async(req, res, next) => {
    if (!req.authuser.isAdmin) {
        return res.status(403).json({ message: "access denied" })
    }
    next()
}
module.exports = { Admin }