import express from 'express'
import {getList, getById, create, deleteObj, edit} from '../Methods/movies.js'

export const moviesRoutes = express.Router()


moviesRoutes.get('/', getList)
moviesRoutes.get('/:id', getById)
moviesRoutes.post('/', create)
moviesRoutes.delete('/:id', deleteObj)
moviesRoutes.put('/:id', edit)

