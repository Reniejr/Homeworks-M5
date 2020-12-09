import express from 'express'
import {getList, create, deleteObj, edit} from '../Methods/projects.js'

export const projectsRoute = express.Router()

projectsRoute.get('/:studentId/projects/', getList)
projectsRoute.post('/:studentId/projects/', create)
projectsRoute.delete('/:studentId/projects/', deleteObj)
projectsRoute.put('/:studentId/projects/', edit)