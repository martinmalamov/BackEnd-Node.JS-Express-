
const { v4 } = require('uuid')
// const path = require('path')
const { saveCube } = require('../controllers/database')

// const databaseFile = path.join(__dirname, '..', 'config/database.json')

class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.id = v4()
        this.name = name || 'No Name'
        this.description = description
        this.imageUrl = imageUrl || 'placeholder'
        this.difficulty = difficulty || 0
    }

    //save Cube
    save(callback) {

        const newCube = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty
        }

        saveCube(newCube, callback)
    }
}

module.exports = Cube