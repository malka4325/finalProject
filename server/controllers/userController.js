
const User = require("../models/User")
const bcrypt= require('bcrypt')

const getAllUsers = async (req, res) => {
    const users = await User.find().lean()
    if (!users)
        return res.status(400).send('no users')
    res.json(users)
}


const deleteUser = async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).json({ message: 'id is required' })
    const user = await User.findById(id).exec()
    if (!user)
        return res.status(400).send('user no found')
    const del = await user.deleteOne()
    res.json(await User.find())
}

 const updateUser = async (req, res) => {
   
    const {_id,userName,password,name,email,address,phone } = req.body
    if (!userName|| !password || !_id|| !email)
        return res.status(400).json({ message: 'username password and email are required' })
    const user = await User.findById(_id).exec()
    if (!user)
        return res.status(400).send('user not found')
    let hashedPwd=user.password
    if(password!==user.password)
       hashedPwd = await bcrypt.hash(password, 10)
    user.userName=userName
    user.password=hashedPwd
    user.name=name
    user.email=email
    user.address=address
    user.phone=phone
const updateuser=await user.save()
res.json(await User.find())
}

module.exports={getAllUsers,deleteUser,updateUser}