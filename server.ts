import express, { Request, Response } from 'express'
const path = require('path')
import AuthController from './controllers/AuthController'
import UserController from './controllers/UserController'
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))

app.use(cors())

app.use(express.static("client/dist"))

app.use('/api/auth', AuthController);
app.use('/api/users', UserController);

app.get("*", (req : Request, res : Response) => {
    res.sendFile(path.join(__dirname, "client/dist", "index.html"))
})