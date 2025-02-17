import express, { response } from "express"
import {PORT, DB} from "./config.js"
import mongoose from "mongoose"
import { Book } from "./models/bookModel.js"
import booksRoute from "./routes/booksRoute.js"

export const app = express()
app.use(express.json())


app.get("/", (request, response)=>{
    return response.status(200).send('[APP] working')
})

// For each request containing /books use this middleware
app.use('/books', booksRoute)

mongoose.connect(DB)
.then(()=>{
    console.log("[DB] Connected")
    app.listen(PORT, ()=>{
        console.log(`[Server] Listning to ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})