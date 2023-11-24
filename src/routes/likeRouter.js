const express = require('express');
const {
    nuevoLike,
    traerTodosLikes,
    traerPlatillosLikes
} = require("../handlers/likeHandler.js")

const likerouter = express.Router();


likerouter.post('/registro', nuevoLike);
likerouter.get('/todos', traerTodosLikes);

likerouter.post('/platilloid', traerPlatillosLikes);




module.exports = likerouter;