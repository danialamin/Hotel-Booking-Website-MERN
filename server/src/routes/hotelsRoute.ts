import { Request, Response, Router } from "express";
import multer from "multer"
import hotelModel from "../models/hotelModel";
import { verifyToken } from "../utils/verifyToken";
import { v2 } from "cloudinary";

const router = Router()

const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
})

router.post('/create', verifyToken, upload.array("imageFiles", 6), async (req: Request, res: Response) => {

  try {
    const images = req.files as Express.Multer.File[]
    const body = req.body
    const uploadPromises = images.map(async(image) => {
    const b64 = Buffer.from(image.buffer).toString("base64")
      let dataURI = 'data:' + image.mimetype + ';base64,' + b64
      const res = await v2.uploader.upload(dataURI)
      return res.url
    })
    const imageUrls = await Promise.all(uploadPromises)
    body.imageurls = imageUrls
    body.pricePerNight = Number(body.pricePerNight)
    body.starRating = Number(body.starRating)
    body.adultCount = Number(body.adultCount)
    body.childCount = Number(body.childCount)

    
    body.userId = req.user
    const hotel = new hotelModel(body)
    await hotel.save()
    res.status(201).json({'message': hotel})
  } 
  catch(err) {
    res.status(500).json({'message': 'error'})
    console.log('Here')
  }
})

router.get('/myHotels', verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await hotelModel.find({userId: req.user})
    return res.status(200).json({'message': hotels}) 
  } catch(err) {
    return res.status(500).json({'message': 'Server error'})
  }
})

router.get('/myHotel/:id', verifyToken, async (req: Request, res: Response) => {
  try {
  const id = req.params.id
  const hotel = await hotelModel.findOne({_id: id, userId: req.user})
  res.status(200).json({'message': hotel})
  } catch(err) {
  res.status(500).json({'message': 'server error'})
  }
})

export default router