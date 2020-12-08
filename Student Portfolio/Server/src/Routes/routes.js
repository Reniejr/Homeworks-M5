import express from 'express'
import {getList, getById, createStudent, deleteStudent} from '../Methods/methods.js'

const routes = express.Router()

routes.get('/', getList)
routes.get('/:id', getById)
routes.post('/', createStudent)
routes.delete('/:id', deleteStudent)

export default routes