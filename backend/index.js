import express, { response } from "express"
import {PORT, DB} from "./config.js"
import mongoose from "mongoose"
import booksRoute from "./routes/booksRoute.js"
import cors from 'cors'

export const app = express()
app.use(express.json())

//CORS
app.use(cors(
    {
       origin: 'http://localhost:3000',
       methods: ['GET', 'POST', 'PUT', 'DELETE'],
       allowedHeaders: ['Content-Type'] 
    }
))

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