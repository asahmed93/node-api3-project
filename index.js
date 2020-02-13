// code away!
const express = require('express')
const server = express()

const userRouter = require('./users/userRouter')


function logger(req,res,next){
    console.log(`${req.method} to ${req.url}`)
    next()
}

server.use(express.json())

server.use(logger)

server.use('/api/users', userRouter)

server.get('/', (req, res) => {
    res.json({ message: 'Success'})
})

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})
