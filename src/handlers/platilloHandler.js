const { 
    crearPlatillo,
    actualizarPlatillo,
    getPlatillos,
    todosPlatillos,
    elmPlatillo
 } = require ("../controllers/platilloController")

const postPlatillo = async(req, res) => {
    try {
        const response = await crearPlatillo( req.body );
        res.status(200).json(response);
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message);
    };
};

const patchPlatillo = async (req, res) => {
    try{
        const response = await actualizarPlatillo( req.body );
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    };
}

const getPlatillosRestaurante = async (req, res) => {
    try {
        const response = await getPlatillos(req.body)
        if(response === null){
            res.status(400).json(`no se encontro restaurante con el id`)
        }else {
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
}

/* Trae todos los platillos */

const todosLosPlatillos = async (req,res) =>{

        let platillos = await todosPlatillos()
        res.status(200).json(platillos)
}

const eliminarPlatillo = async (req, res) => {
    try {
      const idPlatillo = req.params.id;       
      const eliminar = await elmPlatillo(idPlatillo);
      res.status(200).json(eliminar);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };

module.exports = {
    postPlatillo,
    patchPlatillo,
    getPlatillosRestaurante,
    todosLosPlatillos,
    eliminarPlatillo
}