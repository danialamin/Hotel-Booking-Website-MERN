import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()

declare global {   //req does not have user property by default
  namespace Express {
    interface Request {
      user: string
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decodedToken: any) => {
      if (err) {
        return res.status(400).json({'message': 'invalid token'})
      } else {
        req.user = decodedToken
        next()
      }
    })
  } else {
    return res.status(400).json({'message': 'no token'})
  }
}