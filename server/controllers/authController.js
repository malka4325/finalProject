const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const createNewUser = async (req, res) => {
    const { userName, password, name, email, address, phone, role } = req.body
    if (!userName || !password)
        return res.status(400).json({ message: 'userName password and email are required!!!!' })
    const duplicate = await User.findOne({ userName }).lean()
    if (duplicate) {
        return res.status(400).json({ message: "Duplicate username" })
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const user = await User.create({ userName, password: hashedPwd, name, email, address, phone, role })
    if (!user)
        return res.status(400).send('invalid user')
    const userInfo = {
        _id: user._id,
        userName: user.userName,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        role: user.role
    }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken })
}

const login = async (req, res) => {
    const { userName, password } = req.body
    if (!userName || !password)
        return res.status(400).json({ message: 'username and password are required' })
    const user = await User.findOne({ userName }).lean()
    if (!user)
        return res.status(401).json({ message: 'Unauthorized'})
    const match = await bcrypt.compare(password, user.password)
    if (!match)
        return res.status(401).json({ message: 'Unauthorized' })
    const userInfo = {
        _id: user._id,
        userName: user.userName,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        role: user.role
    }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken })
}
module.exports = { createNewUser, login }