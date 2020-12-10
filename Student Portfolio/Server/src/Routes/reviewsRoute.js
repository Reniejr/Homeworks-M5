import express from 'express'
import {getFile, postFile} from '../Methods/reviews.js'

export const reviewRoute = express.Router()

reviewRoute.get('/:projectId/', getFile)
reviewRoute.post('/:projectId/', postFile)