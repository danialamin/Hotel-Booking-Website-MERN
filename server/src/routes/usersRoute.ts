import { Request, Response, Router } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcryptjs"
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
import { schemaSignin, schemaSignup } from "../libs/types";
import { verifyToken } from "../utils/verifyToken";
dotenv.config()

const router = Router()

router.post("/createUser", async (req: Request, res: Response) => {
  const body = req.body
  const result = schemaSignup.safeParse(body)
  if (!result) {res.status(400).json({'message': 'error'})}

  const emailExists = await userModel.findOne({email: body.email})
  if (emailExists) {return res.status(400).json({'message': 'email already exists'})}

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(body.password, salt)

  const {confirmPassword, ...rest} = body
  const newUser = new userModel({...rest, password: hashedPassword})
  
  try {
    await newUser.save()
    const token = jwt.sign({_id: newUser._id}, process.env.JWT_SECRET as string, {expiresIn: "1d"})
    res.status(201).cookie("token", token, {httpOnly: true, secure: true, sameSite: 'none', maxAge: 86400000}).json({'message': newUser})
  } catch(err) {
    res.status(500).json({'message': 'cannot save user to db'})
  }
})

router.post("/signin", async (req: Request, res: Response) => {
  const body = req.body
  const Result = schemaSignin.safeParse(body)

  if (!Result.success) {
    res.status(400).json({'message': 'invalid credentials'})
  }

  const user: any = await userModel.findOne({email: body.email})
  if (!user) {return res.status(400).json({'message': 'invalid credentials'})}

  const isMatch = await bcrypt.compare(body.password, user.password)
  if (!isMatch) {return res.status(400).json({'message': 'invalid credentials'})}

  const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET as string, {expiresIn: '1d'})
  
  res.cookie("token", token, {httpOnly: true, secure: true, sameSite: 'none', maxAge: 86400000})
  res.status(200).json({'message': user})
})

router.get('/isLoggedin', verifyToken, (req: Request, res: Response) => {
  return res.status(200).json({'message': req.user})
})

router.post('/logout', (req: Request, res: Response) => {
  res.cookie("token", "", {httpOnly: true, secure: true, sameSite: 'none', expires: new Date(0) })
  res.status(200).json({'message': 'logged out'})
})

export default router