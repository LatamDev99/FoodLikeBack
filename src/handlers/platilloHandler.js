const { crearPlatillo } = require ("../controllers/platilloController")

const postPlatillo = async(req, res) => {
    try {
        const response = await crearPlatillo( req.body )
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = {
    postPlatillo
}