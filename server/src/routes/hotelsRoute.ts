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

router.post('/create', upload.array("images", 6), async (req: Request, res: Response) => {
  console.log(req.body)
  console.log(req.files)
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
  
  body.imageFiles = imageUrls
  const hotel = new hotelModel(body)
  await hotel.save()
  res.status(201).json({'message': hotel})
  } 
  catch(err) {
    res.status(500).json({'message': 'error'})
    console.log('Here')
  }
})



export default router