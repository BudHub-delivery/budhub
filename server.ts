import path from 'path'
import express, {Request, Response} from 'express'

const app = express()

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log('Server started'))

app.use(express.static("client/dist"))

const testData = [
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

app.get("/api/test", (req, res) => {
    res.send(testData);
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist", "index.html"))
})