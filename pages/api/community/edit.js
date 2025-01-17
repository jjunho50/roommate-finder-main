import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function handler(req, res) {
    if (req.method == 'POST') {
        let edited = {
            title: req.body.title,
            content: req.body.content
        }
        const db = (await connectDB).db("forum")
        let result = await db.collection('community').updateOne(
            { _id: new ObjectId(req.body._id) },
            { $set: edited }
        )
        res.writeHead(302, { Location: '/board' })
        res.end()
    }
}