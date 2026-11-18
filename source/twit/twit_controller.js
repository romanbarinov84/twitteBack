import { Router } from "express";
import { TwistService } from "./twit_service.js";


const router = Router();
const twistService = new TwistService()

router.post('/' , (req,res) => {
  
  
    if(!req.body?.text?.length){
      return res.status(400).json({message:"text is required"})
    }
 const twit = twistService.createTwit(req.body)
 res.status(201).json(twit)
})

export const twitRouter = router