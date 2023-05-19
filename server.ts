import express, {Request, Response} from 'express'
const path = require('path')

const app = express()

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log('Server started'))

app.use(express.static("client/dist"))

type TestData = {
    firstName: string,
    lastName: string,
    email: string
}[];

const testData : TestData = [
    {
        firstName: "Dan",
        lastName: "Rathers",
        email: "d@gmail.com"
    },
    {
        firstName: "Bill",
        lastName: "TheButcher",
        email: "b@gmail.com"
    }
]

app.get("/api/test", (req : Request, res : Response) => {
    res.json(testData);
})

app.get("*", (req : Request, res : Response) => {
    res.sendFile(path.join(__dirname, "client/dist", "index.html"))
})