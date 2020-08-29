const express = require('express')
const router = new express.Router()

router.get('/create/accessory', (req, res) => {
    res.render('createAccessory', {
        title: 'Create accessory'
    })
})

router.post('/create/accessory', async (req, res) => {
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

router.get('/attach/accessory/:id', async (req, res) => {

    const cube = await getCube(req.params.id)
    const accessories = await getAccessories()

    const cubeAccessories = cube.accessories.map(acc => acc._id.valueOf().toString())

    const notAttachedAccessories = accessories.filter(acc => {
        const accessoryString = acc._id.valueOf().toString()
        return !cubeAccessories.includes(accessoryString)
    })


    const canAttachAccessory = cube.accessories.length !== accessories.length && accessories.length > 0

    res.render('attachAccessory', {
        title: 'Attach accessory',
        ...cube,
        accessories: notAttachedAccessories,
        canAttachAccessory
    })

})

router.post('/attach/accessory/:id', async (req, res) => {

    const {
        accessory
    } = req.body
    await updateCube(req.params.id, accessory)

    res.redirect(`/details/${req.params.id}`)
})

module.exports = router