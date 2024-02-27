import dbConnect from "../../../utils/dbConnect";
import SignUp from '../../../models/SignUpModel'

dbConnect()
export default async function Most (req, res) {
    const { method } = req
    switch (method) {
        case 'GET': {
            try {
                const notes = await SignUp.find({})
                notes.sort((a,b) => (a.count > b.count) ? -1 : 1)
                res.status(200).json({ success: true, data: notes.slice(0,4) })
            } catch {
                res.status(400).json({ success: false })
            }
            break;
        }

        default:
            res.status(400).json({ success: false })
            break;
    }
}
