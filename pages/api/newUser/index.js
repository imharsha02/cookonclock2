import dbConnect from "../../../utils/dbConnect";
import SignUp from '../../../models/SignUpModel'

dbConnect()
export default async(req, res) => {
    const { method } = req
    switch (method) {
        case 'GET': {
            try {
                const notes = await SignUp.find({})
                res.status(200).json({success: true, data: notes})
            } catch {
                res.status(400).json({success: false})
            }
            break;
        }
      case 'POST':
          try {
              const user = await SignUp.create(req.body)
              res.status(201).json({success: true, data: user})
              console.log(req.Name)
              const note = await SignUp.create(req.body)
              res.status(201).json({success: true, data: note})
          }catch (error){
              console.error(error)
            res.status(400).json({success: error})
          }
          break;
      default:
        res.status(400).json({ success: false })
        break;
    }
  }
