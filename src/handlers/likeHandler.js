const {
    registro,
    traerTodos,
    traerPlatilloIdConLike
} = require("../controllers/likeController.js")


const nuevoLike = async(req, res) => {
    try {
        let nuevoCliente = await registro(req.body)
        res.status(200).json(nuevoCliente)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}


const traerTodosLikes = async(req, res) => {
    try {
        let likes = await traerTodos(req.body)
        res.status(200).json(likes)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

const traerPlatillosLikes = async ( req, res ) => {
    try {
        let platilloLikes = await traerPlatilloIdConLike(req.body)
        res.status(200).json(platilloLikes)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }    
}




module.exports = { nuevoLike, traerTodosLikes, traerPlatillosLikes }