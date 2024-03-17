import cors from "cors"
import express from "express"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import dotenv from "dotenv/config"

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({origin: true, credentials:  true}))
app.use(express.urlencoded({extended: true}))



mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => console.log("connected to db"))
app.listen(3002, () => console.log('listening to port 3002'))