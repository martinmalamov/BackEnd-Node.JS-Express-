const env = process.env.NODE_ENV || 'development';

const jwt = require('jsonwebtoken')
const config = require('../config/config')[env]
const bcrypt = require('bcrypt')
const User = require('../models/user')

const generateToken = data => {
    const token = jwt.sign(data, config.privateKey)

    return token
}

const saveUser = async (req, res) => {

    const {
        username,
        password
    } = req.body

    //hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
        username,
        password: hashedPassword
    })

    const userObject = await user.save()

    const token = generateToken({
        userID: userObject._id,
        username: userObject.username
    })

    res.cookie('authId', token)

    console.log('token', token)

    return true
}

const verifyUser = async (req, res) => {
    const {
        username,
        password
    } = req.body

    //get User by username

    const user = await User.findOne({ username })
    console.log(user)

    const status = await bcrypt.compare(password, user.password)
    console.log('status', status)

    if (status === true) {
        const token = generateToken({
            userID: user._id,
            username: user.username
        })

        res.cookie('authId', token)
    }


    return status
}

module.exports = {
    saveUser,
    verifyUser
}