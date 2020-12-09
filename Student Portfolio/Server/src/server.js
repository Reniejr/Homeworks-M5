import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './Routes/routes.js'
import listEndpoints from 'express-list-endpoints'

const server=express(),
    host='localhost',
    PORT=process.env.PORT || 5000



server.use(bodyParser.json())
server.use(cors())
server.use('/students', routes)

server.get('/', (req, res)=>{
    res.send('Homepage')
})

console.log(listEndpoints(server))

server.listen(PORT, host, ()=>console.log(`Server running on: http://${host}:${PORT}`))
