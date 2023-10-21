const express = require('express');

const { nuevoReview, obtenerReviews, desactivarReviewRestaurante, todosActivosReview,todosInactivosReview  } = require("../handlers/reviewHandler.js")
// desactivarReviewRestaurante, todosActivosReview, todosInactivosReview
const reviewRouter = express.Router();

reviewRouter.post('/registro', nuevoReview);

reviewRouter.get('/todos', obtenerReviews);
reviewRouter.get('/activos', todosActivosReview);
reviewRouter.get('/inactivos', todosInactivosReview);

reviewRouter.patch('/desact', desactivarReviewRestaurante);
module.exports = reviewRouter;