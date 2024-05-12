import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "./[...nextauth]"

export default async function handler(req, res) {
    let session = await getServerSession(authOptions)
    if (req.method == 'POST') {
        let edited = {
            name: req.body.name,
            studentId: req.body.studentId,
            password: req.body.password,
            gender: req.body.gender,
            wakeupTime: req.body.wakeupTime,
            sleepTime: req.body.sleepTime,
            smoking: req.body.smoking,
            cleaning: req.body.cleaning,
        }
        const db = (await connectDB).db("forum")
        let result = await db.collection('user_cred').updateOne(
            { _id: new ObjectId(session.user.ObjectId) },
            { $set: edited }
        )
        res.writeHead(302, { Location: '/' })
        res.end()
    }
}