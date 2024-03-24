import cors from "cors"
import express from "express"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()
import usersRoute from "./routes/usersRoute"

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({origin: true, credentials:  true}))
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.CONNECTION_STRING as string)
  .then(() => console.log("connected to db"))

app.listen(3100, () => console.log('listening to port 3100'))

app.use("/users", usersRoute)