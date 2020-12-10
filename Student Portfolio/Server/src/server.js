import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {studentRoutes} from './Routes/studentRoute.js'
import {projectsRoute} from './Routes/projectsRoute.js'
import listEndpoints from 'express-list-endpoints'
import {notFound, unAuthorized, forbidden, badRequest, catchAll} from './errorsHandling.js'
import path, { join } from 'path'
import {fileRouter} from './Routes/filesRoutes.js'
import { reviewRoute } from './Routes/reviewsRoute.js'


const server=express(),
    host='localhost',
    PORT=process.env.PORT || 5000,
    __dirname = path.resolve(),
    publicFolder = join(__dirname, '../public')

const logger = (req, res, next)=>{
    console.log(`Logged ${req.url} ${req.method} -- ${new Date()}`)
    next()
}

server.use(express.static(publicFolder))
server.use(bodyParser.json())
server.use(cors())
server.use('/students', studentRoutes)
server.use('/students', projectsRoute)
server.use('/images', fileRouter)
server.use('/reviews', reviewRoute)

server.use(notFound)
server.use(unAuthorized)
server.use(forbidden)
server.use(badRequest)
server.use(catchAll)

console.log(listEndpoints(server))

server.listen(PORT, host, ()=>console.log(`Server running on: http://${host}:${PORT}`))
