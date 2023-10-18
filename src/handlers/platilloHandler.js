const { 
    crearPlatillo,
    actualizarPlatillo
 } = require ("../controllers/platilloController")

const postPlatillo = async(req, res) => {
    try {
        const response = await crearPlatillo( req.body );
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    };
};

const patchPlatillo = async (req, res) => {
    try{
        const response = await actualizarPlatillo( req.body );
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    };
}

module.exports = {
    postPlatillo,
    patchPlatillo
}