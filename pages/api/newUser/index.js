import dbConnect from "../../../utils/dbConnect";
import SignUp from '../../../models/SignUpModel'

dbConnect()
export default async function handler (req, res) {
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
              const note = await SignUp.create(req.body)
              res.status(201).json({success: true, data: note})
          }catch (error){
            res.status(400).json({success: false})
          }
          break;
        // const { Name, PhoneNumber, EmailAddress, Password } = req.body;
        // if(Name&&PhoneNumber&&EmailAddress&&Password){
        //   try{
        //    let user = new SignUP({
        //      Name,
        //      PhoneNumber,
        //      EmailAddress,
        //      Password
        //    })
        //    let userCreated = await user.save();
        //    return res.status(200).send(userCreated)
        //   }catch(error){
        //     return res.status(500).send(error.message)
        //   }
        // }else{
        //   res.status(422).send('req_method_not_supported');
        // }
        break;
      default:
        res.status(400).json({ success: false })
        break;
    }
  }
