const env = process.env.NODE_ENV || 'development';

const express = require('express')
const jwt = require('jsonwebtoken')
const Cube = require('../models/cube');
const { authAccess, getUserStatus, authAccessJSON } = require('../controllers/user');
const { getCubeWithAccessories } = require('../controllers/cubes');
const config = require('../config/config')[env]
const router = new express.Router()

router.get('/edit', authAccess, getUserStatus, (req, res) => {
    res.render('editCubePage', {
        isLoggedIn: req.isLoggedIn
    })
})

router.get('/delete', authAccess, getUserStatus, (req, res) => {
    res.render('deleteCubePage', {
        isLoggedIn: req.isLoggedIn
    })
})

router.get('/details/:id', getUserStatus, async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id)

    res.render('details', {
        title: 'Details | Cube Workshop',
        // ...cube or to put ( cube )  to template
        ...cube,
        isLoggedIn: req.isLoggedIn
    })
})

router.get('/create', authAccess, getUserStatus, (req, res) => {
    res.render('create', {
        title: 'Create | Cube Workshop',
        isLoggedIn: req.isLoggedIn
    })
})

router.post('/create',authAccess, (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body

    const token = req.cookies['authId']
    const decodedObject = jwt.verify(token, config.privateKey)
    console.log(decodedObject)

    const cube = new Cube({ name, description, imageUrl, difficulty: difficultyLevel, creatorId: decodedObject.userID })

    cube.save((err) => {
        if (err) {
            console.log(err)
            res.redirect('/create')
        } else {
            res.redirect('/')
        }
    })
})

module.exports = router