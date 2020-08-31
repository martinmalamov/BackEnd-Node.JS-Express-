const express = require('express')
const { authAccess, getUserStatus, authAccessJSON } = require('../controllers/user')
const { attachedAccessories } = require('../controllers/accessories.js')
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

router.post('/create/accessory',authAccess, async (req, res) => {
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

    await accessory.save()

    res.redirect('/create/accessory')
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

    // const cube = await getCube(req.params.id)
    // const accessories = await getAccessories()

    // const cubeAccessories = cube.accessories.map(acc => acc._id.valueOf().toString())

    // const notAttachedAccessories = accessories.filter(acc => {
    //     const accessoryString = acc._id.valueOf().toString()
    //     return !cubeAccessories.includes(accessoryString)
    // })


    // const canAttachAccessory = cube.accessories.length !== accessories.length && accessories.length > 0

    // res.render('attachAccessory', {
    //     title: 'Attach accessory',
    //     ...cube,
    //     accessories: notAttachedAccessories,
    //     canAttachAccessory
    // })

})

router.post('/attach/accessory/:id', authAccess, async (req, res) => {

    const {
        accessory
    } = req.body
    await updateCube(req.params.id, accessory)

    res.redirect(`/details/${req.params.id}`)
})

module.exports = router