import express from 'express'
import {getList, getById, create, deleteObj, edit} from '../Methods/methods.js'

export const routes = express.Router()


routes.get('/', getList)
routes.get('/:id', getById)
routes.post('/', create)
routes.delete('/:id', deleteObj)
routes.put('/:id', edit)

