const router = require('./router')
const express = require('express')
const server = express()
const port = 3000;

server.use(express.json())
router(server)

server.listen(port, ()=>{
    console.log(`listening to ${port}`)
})