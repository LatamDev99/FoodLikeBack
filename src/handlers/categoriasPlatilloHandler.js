
const { agregarCategorias, traerCategorias, cambiarCategoriaPlatillo, eliminandoCategoria,
    cambiarCategoriaNombre, traerCategoriasPlatillos } = require("../controllers/categoriasPlatilloController")

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

const borrarCategoria = async (req,res) =>{
    const idCateoria = req.params.id; 
    try {
        let categoriaEliminar = await eliminandoCategoria(idCateoria)
        res.status(200).json(categoriaEliminar)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

const cambiarNombreCategoria = async (req, res) =>{
    try {
        let categoria = await cambiarCategoriaNombre(req.body)
        res.status(200).json(categoria)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

const traerCategoriaPlatillo = async (req, res)=>{
    try {
        let categoria= await traerCategoriasPlatillos(req.body) 
        res.status(200).json(categoria)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

module.exports=  {agregarCategoria, todasLasCategorias, cambiarCategoria, borrarCategoria , cambiarNombreCategoria, traerCategoriaPlatillo } 