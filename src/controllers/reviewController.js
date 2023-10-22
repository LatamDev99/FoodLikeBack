const { Review, Restaurante, Cliente } = require("../db.js")

/* Función para registrar un Review */ 



const registroReview = async( review ) => {
    const {comentario, calificacion, activo, usuario, usuarioId,  restauranteId} = review

    console.log(usuarioId , restauranteId)

    let objetoReview = {
        comentario, 
        calificacion, 
        activo,
        usuario,
        usuarioId,
        restauranteId
        }  
    await Review.create(objetoReview)


        return "Review registrado con éxito"
}

/* Función para obtener todos los Reviews */ 

const todosReviews = async () =>{
    let reviews = await Review.findAll()
    return reviews
}

const reviewDesAct = async ( review ) =>{

    const { id } = review

    let reviewDesact = await Review.findByPk(
            id
    )

    if(reviewDesact.activo){
        reviewDesact.activo = false
        await reviewDesact.save()
        return "Review desactivado"
    }
    else{
        reviewDesact.activo = true
        await reviewDesact.save()
        return "Review activado"
    }   
}

/* Función para ver Reviews activos */

const activosReviews = async (  ) =>{

    let review = await Review.findAll({
        where: {
            activo: true
        }
    })
    return review

}

/* Función para ver Reviews inactivos */

const inactivosReviews = async ( restaurante ) =>{

    let review = await Review.findAll({
        where: {
            activo: false
        }
    })
    return review

}

module.exports={
    registroReview,
    todosReviews,
    reviewDesAct,
    activosReviews,
    inactivosReviews
};