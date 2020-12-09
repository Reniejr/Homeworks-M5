import express from 'express'
import {getList, getById, create, deleteObj, edit} from '../Methods/students.js'

export const studentRoutes = express.Router()


studentRoutes.get('/', getList)
studentRoutes.get('/:id', getById)
studentRoutes.post('/', create)
studentRoutes.delete('/:id', deleteObj)
studentRoutes.put('/:id', edit)

