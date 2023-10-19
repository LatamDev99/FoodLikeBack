const { registroReview, todosReviews, reviewDesAct, activosReviews,inactivosReviews } = require("../controllers/reviewController");

const nuevoReview = async(req, res) => {
    try {
        let review = await registroReview(req.body)

        res.status(200).json(review)
    } catch (error) {
        res.status(400).json(error)
    }
}

const obtenerReviews = async(req,res) =>{
    let restaurante = await todosReviews()
    res.status(200).json(restaurante)
}

const desactivarReviewRestaurante = async(req,res) =>{

    try {
        let review = await reviewDesAct(req.body)
        res.status(200).json(review)
    } catch (error) {
        res.status(400).json(error)
    }  
}

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
    todosInactivosReview
}


