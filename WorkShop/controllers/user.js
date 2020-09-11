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

    try {
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

        return true
    } catch (err) {
        return {
            error: true,
            message: err
        }
    }

}

const verifyUser = async (req, res) => {
    const {
        username,
        password
    } = req.body

    //get User by username

    try {
        const user = await User.findOne({ username })
        console.log(user)

        if (!user) {
            return {
                error: true,
                message: 'There is no such user'
            }
        }

        const status = await bcrypt.compare(password, user.password)
        console.log('status', status)

        if (status === true) {
            const token = generateToken({
                userID: user._id,
                username: user.username
            })

            res.cookie('authId', token)
        }

        return {
            error: !status,
            message: status || 'Wrong password'
        }

    } catch (err) {
        return {
            error: false,
            message: 'There is no such user',
            status
        }
    }
}

const authAccess = (req, res, next) => {
    const token = req.cookies['authId']

    if (!token) {
        return res.redirect('/')
    }

    try {
        jwt.verify(token, config.privateKey)
        next()
    } catch (error) {
        res.redirect('/')
    }
}

const authAccessJSON = (req, res, next) => {
    const token = req.cookies['authId']

    if (!token) {
        return res.json({
            error: 'Not authenticated'
        })
    }

    try {
        jwt.verify(token, config.privateKey)
        next()
    } catch (error) {
        return res.json({
            error: 'Not authenticated'
        })
    }
}

const guestAccess = (req, res, next) => {
    const token = req.cookies['authId']

    if (!token) {
        req.isLoggedIn = false
    }
    next()
}

const getUserStatus = (req, res, next) => {
    const token = req.cookies['authId']

    if (!token) {
        //ERROR too many redirect if we use return !!!
        // return res.redirect('/')
        req.isLoggedIn = false
    }

    try {
        jwt.verify(token, config.privateKey)
        req.isLoggedIn = true
    } catch (error) {
        req.isLoggedIn = false
    }
    next()

}

module.exports = {
    saveUser,
    authAccess,
    verifyUser,
    guestAccess,
    getUserStatus,
    authAccessJSON
}