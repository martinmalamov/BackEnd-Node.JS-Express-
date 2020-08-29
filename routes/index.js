// TODO: Require Controllers...
const { Router } = require('express')
const { getAllCubes, getCube, updateCube, getCubeWithAccessories } = require('../controllers/cubes')
const { getAccessories } = require('../controllers/accessories.js')
// const { getCube } = require('../controllers/database')
const Cube = require('../models/cube')
const Accessory = require('../models/accessory')

const router = Router()

router.get('/', async (req, res) => {
    const cubes = await getAllCubes()
    res.render('index', {
        title: 'Cube Workshop',
        cubes
    })
})
router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About | Cube Workshop'
    })
})


module.exports = router