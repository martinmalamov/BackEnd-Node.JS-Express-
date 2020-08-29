
// const { v4 } = require('uuid')
// const path = require('path')
// const { saveCube } = require('../controllers/database')
// const databaseFile = path.join(__dirname, '..', 'config/database.json')

const mongoose = require('mongoose')


class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.id = v4()
        this.name = name || 'No Name'
        this.description = description
        this.imageUrl = imageUrl || 'placeholder'
        this.difficulty = difficulty || 0
    }

    //save Cube
    // save(callback) {

    //     const newCube = {
    //         id: this.id,
    //         name: this.name,
    //         description: this.description,
    //         imageUrl: this.imageUrl,
    //         difficulty: this.difficulty
    //     }

    //     saveCube(newCube, callback)
    // }
}

const CubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlenght: 2000
    },
    imageUrl: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
        min: 1,
        max: 10
    },
    accessories: [{
        type: 'ObjectId',
        ref: 'Accessory'
    }]
})

CubeSchema.path('imageUrl').validate(function (url) {
    return url.startWith('http://') || url.startWith('https://')
}, 'Image url is not valid')

module.exports = mongoose.model('Cube', CubeSchema)