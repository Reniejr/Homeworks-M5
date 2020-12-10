import express from 'express'
import {getFile, postFile, deleteReview} from '../Methods/reviews.js'

export const reviewRoute = express.Router()

reviewRoute.get('/:id', getFile)
reviewRoute.post('/:id', postFile)
reviewRoute.delete('/:id', deleteReview)