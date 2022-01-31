import dbConnect from "../../../utils/dbConnect";
import SignUp from '../../../models/SignUpModel'

dbConnect()
export default async (req, res) => {
    const { method } = req
    switch (method) {
        case 'GET': {
            try {
                const notes = await SignUp.find({})
                res.status(200).json({ success: true, data: notes })
            } catch {
                res.status(400).json({ success: false })
            }
            break;
        }
        case 'POST':
            try {
                const modifiedObj= await SignUp.findOneAndUpdate({name:req.body.name}, {$inc: {count: 1}}, {new: true, upsert: true});

                res.status(201).json({ success: true, data: modifiedObj })
            } catch (error) {
                console.error(error)
                res.status(400).json({ error: error })
            }
            break;
        case 'DELETE':
            try {
                const deletedUser = await SignUp.remove();

                res.status(200).json({ success: true, data: {} })
            } catch (error) {
                res.status(400).json({ success: false })
                console.error(error)
            }
            break;

        default:
            res.status(400).json({ success: false })
            break;
    }
}
