import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    let session = await getServerSession(req, res, authOptions)
    console.log(session)

    if (session) {
        req.body.author = session.user.email
        req.body.name = session.user.name
        req.body.smoking = session.user.smoking
        req.body.cleaning = session.user.cleaning
        req.body.wakeupTime = session.user.wakeupTime
        req.body.sleepTime = session.user.sleepTime
        req.body.dormitory = session.user.dormitory
        req.body.gender = session.user.gender
    }

    if (req.method == 'POST') {
        console.log(req.body)
        const db = (await connectDB).db("forum")
        let result = await db.collection('post').insertOne(req.body)

        res.writeHead(302, { Location: '/' });
        res.end();
    }
}