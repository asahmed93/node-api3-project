// code away!
const express = require('express')
const server = express()

const userRouter = require('./users/userRouter')


function logger(req,res,next){
    console.log(`${req.method} to ${req.url}`)
}

server.use(express.json())

server.use('/api/users', userRouter)

server.get('/', (req, res) => {
    res.json({ message: 'Success'})
})

const port = 5000;
server.listen(port, () => {
    console.log(`server is listening on port ${port}`)
    
})

server.use(logger)