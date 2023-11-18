
const { agregarCategorias, traerCategorias, cambiarCategoriaPlatillo } = require("../controllers/categoriasPlatilloController")

const agregarCategoria = async(req,res) =>{
    try {
        let categorias = await agregarCategorias(req.body)
        res.status(200).json(categorias)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }

}


const todasLasCategorias = async(req,res) =>{
    try {
        let categorias = await traerCategorias()
        res.status(200).json(categorias)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}


const cambiarCategoria = async(req,res) =>{
    try {
        let categoriaCambiada = await cambiarCategoriaPlatillo(req.body)
        res.status(200).json(categoriaCambiada)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}



module.exports=  {agregarCategoria, todasLasCategorias, cambiarCategoria  } 