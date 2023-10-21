const { 
    crearPlatillo,
    actualizarPlatillo,
    getPlatillos
 } = require ("../controllers/platilloController")

const postPlatillo = async(req, res) => {
    try {
        const response = await crearPlatillo( req.body );
        if (response === null){
            res.status(400).json(`no se encontro restaurante con el id`)
        }else{
            res.status(201).json(response);
        }
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

const getPlatillosRestaurante = async (req, res) => {
    try {
        const id = req.params.id
        const response = await getPlatillos(id)
        if(response === null){
            res.status(400).json(`no se encontro restaurante con el id`)
        }else {
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = {
    postPlatillo,
    patchPlatillo,
    getPlatillosRestaurante
}