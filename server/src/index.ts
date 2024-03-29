import cors from "cors"
import express from "express"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()
import usersRoute from "./routes/usersRoute"
import hotelsRoute from "./routes/hotelsRoute"
import bodyParser from "body-parser"

const app = express()

app.use(cookieParser())
app.use(cors({origin: true, credentials: true}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


mongoose.connect(process.env.CONNECTION_STRING as string)
  .then(() => console.log("connected to db"))

app.use("/users", usersRoute)
app.use("/hotels", hotelsRoute)

app.listen(3100, () => console.log('listening to port 3100'))