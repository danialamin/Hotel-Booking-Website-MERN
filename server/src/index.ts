import cors from "cors"
import express from "express"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()
import usersRoute from "./routes/usersRoute"
import hotelsRoute from "./routes/hotelsRoute"
import bodyParser from "body-parser"
import { v2 } from "cloudinary"

const app = express()

v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

app.use(cookieParser())
app.use(cors({origin: true, credentials: true}))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.json())

mongoose.connect(process.env.CONNECTION_STRING as string)
  .then(() => console.log("connected to db"))

app.use("/users", usersRoute)
app.use("/hotels", hotelsRoute)

app.listen(3100, () => console.log('listening to port 3100'))