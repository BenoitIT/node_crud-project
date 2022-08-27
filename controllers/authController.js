const user = require("../Models/User");
const lodash = require("lodash")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const joi = require("joi");
const sec = require("./Appsecrete")
const saveUser = async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const userInfo = new user;
        userInfo.email = req.body.email;
        userInfo.password = hashedPassword;
        const saved = await userInfo.save()
        res.send(
            lodash.pick(userInfo, ["email", "password"])
        )
    } catch (error) {
        console.log(error.message)
    }
}
const listUsers = async(req, res) => {
    try {
        const list = await user.find()
        res.json({ message: "list of users", data: list })
    } catch (error) {
        console.log(error.message)
    }

}
const deleteuser = async(req, res) => {
    try {
        const Uid = req.params.id
        const ondeleting = await user.findByIdAndRemove(Uid)
        res.json({
            message: "the user is removed"
        })
    } catch (error) {
        console.log(error.message)
    }
}
const loginUser = async(req, res) => {
    let incommingEmail = req.body.email
    let incommingPass = req.body.password
    if (!incommingPass || !incommingEmail) {
        res.json({ message: "please enter complete credentials" })
    }
    try {
        let validUser = await user.findOne({ email: incommingEmail }).lean()
        if (!validUser) {
            res.json({ message: "incorrect email and password" })
        }
        const validpass = await bcrypt.compare(incommingPass, validUser.password)
        if (!validpass) {
            res.json({ message: "incorrect password and email" })
        }
        const JWT_SECRET = "weneverknowhowthesituationis"
        const token = jwt.sign({
            _id: validUser._id,
            email: validUser.email,
            isAdmin: validUser.isAdmin
        }, JWT_SECRET)
        res.header("x-auth-token", token)
        res.json({ message: "welcome dear" })
    } catch (error) {
        console.log(JSON.stringify(error.message))
    }

}
const validUser = async(user) => {
    const schema = {
        email: joi.string().required().email(),
        password: joi.string().required().max(30).min(6)
    }
    return joi.Validate(user, schema)
}
module.exports = { saveUser, validUser, deleteuser, listUsers, loginUser }