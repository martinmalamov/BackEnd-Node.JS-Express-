const Cube = require('../models/cube.js')

const newCube = new Cube('Default' , 'This is default cube' , 'https://google.com' , 1)
console.log(newCube)

newCube.save()