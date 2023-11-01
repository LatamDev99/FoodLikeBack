const { registroReview, todosReviews, reviewDesAct, activosReviews,inactivosReviews,  } = require("../controllers/reviewController");

/* Registrar Review */

const nuevoReview = async(req, res) => {
    try {
        let review = await registroReview(req.body)

        res.status(200).json(review)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

/* Todos los Reviews */

const obtenerReviews = async(req,res) =>{
    let restaurante = await todosReviews()
    res.status(200).json(restaurante)
}

/* Desactivar o activar Reviews */

const desactivarReviewRestaurante = async(req,res) =>{

    try {
        let review = await reviewDesAct(req.body)
        res.status(200).json(review)
    } catch (error) {
        res.status(400).json(error)
    }  
}

/* Todos los Reviews activos */

const todosActivosReview = async(req, res) => {
    try {
        let review = await activosReviews();
        if (review.length === 0) {
            res.status(400).json("No hay reviews activos");
        } else {
            res.status(200).json(review);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

/* Todos los reviews inactivos */

const todosInactivosReview = async(req, res) => {
    try {
        let review = await inactivosReviews();
        if (review.length === 0) {
            res.status(400).json("No hay reviews inactivos");
        } else {
            res.status(200).json(review);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}



module.exports = {
    nuevoReview, 
    obtenerReviews,
    desactivarReviewRestaurante,
    todosActivosReview,
    todosInactivosReview,
}


