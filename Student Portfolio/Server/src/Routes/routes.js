import express from 'express'
import {getList, getById} from '../Methods/methods.js'

const routes = express.Router()

routes.get('/', getList)
routes.get('/:id', getById)

export default routes