import { connectDB } from "@/util/database";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const postId = req.body.postId;
        console.log(postId);

        let session = await getServerSession({ req, res, authOptions });
        const db = (await connectDB()).db('forum');

        // Retrieve the post from the database
        let found = await db.collection('comment').findOne({ _id: new ObjectId(postId) });

        if (found && found.author === session.user.email) {
            let result = await db.collection('comment').deleteOne({ _id: new ObjectId(postId) });
            return res.status(200).json('삭제완료');
        } else {
            return res.status(500).json('현재유저와 작성자 불일치');
        }
    }
}
