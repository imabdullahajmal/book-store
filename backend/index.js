import express, { response } from "express"
import {PORT, DB} from "./config.js"
import mongoose from "mongoose"
import { Book } from "./models/bookModel.js"

const app = express()
app.use(express.json())

app.get("/", (request, response)=>{
    return response.status(200).send('[APP] working')
})

app.post('/books', async (request, response) => {
    try {

        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({msg: "Send all required fields"})
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        }

        const book = await Book.create(newBook)
        return response.status(201).send(book)
        
    } catch (error) {
        console.log(error)
        return response.status(500)
    }
})

app.get('/books', async (request, response)=> {
    try {
        const books = await Book.find({})
        return response.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        response.status(500).send({msg: error.message})
    }
})





mongoose.connect(DB)
.then(()=>{
    console.log("[DB] Connected")
    app.listen(PORT, ()=>{
        console.log(`[Server] Listning to ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})