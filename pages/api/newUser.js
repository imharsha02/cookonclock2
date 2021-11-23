import dbConnect from "../../utils/dbConnect";
import SignUP from '../../models/SignUpModel'
export default async function handler (req, res) {
    const { method } = req
    dbConnect()
    switch (method) {
      case 'POST':
        const { Name, PhoneNumber, EmailAddress, Password } = req.body;
        if(Name&&PhoneNumber&&EmailAddress&&Password){
          try{
           let user = new SignUP({
             Name,
             PhoneNumber,
             EmailAddress,
             Password
           })
           let userCreated = await user.save();
           return res.status(200).send(userCreated)
          }catch(error){
            return res.status(500).send(error.message)
          }
        }else{
          res.status(422).send('req_method_not_supported');
        }
        break;
      default:
        res.status(400).json({ success: false })
        break;
    }
  }
