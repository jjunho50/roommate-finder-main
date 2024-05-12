import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    let session = await getServerSession(req, res, authOptions)
    console.log(session)

    if (session) {
        req.body.author = session.user.email
        req.body.name = session.user.name
        req.body.dormitory = session.user.dormitory
    }

    if (req.method == 'POST') {
        console.log(req.body)
        const db = (await connectDB).db("forum")
        let result = await db.collection('community').insertOne(req.body)

        res.writeHead(302, { Location: '/board' });
        res.end();
    }
}