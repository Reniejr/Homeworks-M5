import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {studentRoutes} from './Routes/studentRoute.js'
import {projectsRoute} from './Routes/projectsRoute.js'
import listEndpoints from 'express-list-endpoints'

const server=express(),
    host='localhost',
    PORT=process.env.PORT || 5000



server.use(bodyParser.json())
server.use(cors())
server.use('/students', studentRoutes)
server.use('/students', projectsRoute)

server.get('/', (req, res)=>{
    res.send('Homepage')
})

console.log(listEndpoints(server))

server.listen(PORT, host, ()=>console.log(`Server running on: http://${host}:${PORT}`))
