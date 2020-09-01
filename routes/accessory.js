const express = require('express')
const { authAccess, getUserStatus, authAccessJSON } = require('../controllers/user')
const { attachedAccessories } = require('../controllers/accessories.js')
const Accessory = require('../models/accessory')
const { updateCube } = require('../controllers/cubes.js')
// // const { getCube } = require('../controllers/database')
// const Cube = require('../models/cube')
// const Accessory = require('../models/accessory')

const router = new express.Router()

router.get('/create/accessory', authAccess, getUserStatus, (req, res) => {
    res.render('createAccessory', {
        title: 'Create accessory',
        isLoggedIn: req.isLoggedIn
    })
})

router.post('/create/accessory', authAccess, async (req, res) => {
    const {
        name,
        description,
        imageUrl
    } = req.body

    const accessory = new Accessory({
        name,
        description,
        imageUrl
    })

    try {
        await accessory.save()

        res.render('createAccessory', {
            title: 'Create accessory',
            isLoggedIn: req.isLoggedIn
        })
    } catch (err) {
        res.render('createAccessory', {
            title: 'Create accessory',
            isLoggedIn: req.isLoggedIn,
            error: 'Accessory details are not valid'
        })
    }


})

router.get('/attach/accessory/:id', authAccess, getUserStatus, async (req, res, next) => {
    const { id: cubeId } = req.params
    try {
        const data = await attachedAccessories(cubeId)

        res.render('attachAccessory', {
            title: 'Attach accessory',
            ...data,
            isLoggedIn: req.isLoggedIn
        });
    } catch (err) {
        next(err)
    }
})

router.post('/attach/accessory/:id', authAccess, async (req, res) => {

    const {
        accessory
    } = req.body
    await updateCube(req.params.id, accessory)

    res.redirect(`/details/${req.params.id}`)
})

module.exports = router