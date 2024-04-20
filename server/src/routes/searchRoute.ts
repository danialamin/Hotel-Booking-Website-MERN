import { Router, Request, Response } from "express";
import hotelModel from "../models/hotelModel"

const router = Router()

router.get("/search", async (req: Request, res: Response) => {
  try {
    const pageSize = 5
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1")
    const skip = (pageNumber - 1) * pageSize

    const hotels = await hotelModel.find().skip(skip).limit(pageSize)
    const total = await hotelModel.countDocuments()
    
    const response = {
      data: hotels,
      pagination: {
        total: total,
	page: pageNumber,
	pages: Math.ceil(total / pageSize)
      }
    }
    
    res.status(200).json(response)
  } catch(error) {
    console.log("error", error)
    res.status(500).json({'message': 'server error'})
  }

})


export default router
