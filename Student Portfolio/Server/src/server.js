import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './Routes/routes.js'

const server=express(),
    host='localhost',
    PORT =5000



server.use(bodyParser.json())
server.use(cors())
server.use('/students', routes)

server.get('/', (req, res)=>{
    res.send('Homepage')
})

server.listen(PORT, host, ()=>console.log(`Server running on: http://${host}:${PORT}`))
