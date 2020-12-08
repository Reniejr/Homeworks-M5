import express from 'express'
import {getList, getById, createStudent} from '../Methods/methods.js'

const routes = express.Router()

routes.get('/', getList)
routes.get('/:id', getById)
routes.post('/', createStudent)

export default routes