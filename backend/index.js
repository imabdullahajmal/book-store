import express, { response } from "express"
import {PORT, DB} from "./config.js"
import mongoose from "mongoose"

const app = express()

app.get("/", (request, response)=>{
    // console.log(request)
    return response.status(200).send('[APP] working')
})

app.post('/books', async (request, res) => {
    try {
        
    } catch (error) {
        console.log(error)
        return response.status(500)
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