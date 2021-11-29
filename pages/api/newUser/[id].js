import dbConnect from "../../../utils/dbConnect";
import SignUp from '../../../models/SignUpModel'

dbConnect()

export default async (req,res) => {
    const {query : {id}, method} = req;
    switch(method){
        case 'GET':
            try{
                const user = await SignUp.findById(id);
                if(!user){
                    return res.status(400).json({success:false});
                }
                res.status(200).json({success:true, data:user })
            }catch(error){
                res.status(400).json({success:false});
                console.error(error);
            }
        break;

        case 'DELETE':
            try{
                const deletedUser= await SignUp.deleteOne({_id:id});
                if(!deletedUser){
                     return res.status(400).json({success:false})
                }
                res.status(200).json({success:true, data:{} })
            }catch(error){
                res.status(400).json({success:false})
                console.error(error )
            }
            break; 

        default: res.status(400).json({success:false})
        break;
    }
} 