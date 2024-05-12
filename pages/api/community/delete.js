import { connectDB } from "@/util/database"
import { authOptions } from "../auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { ObjectId } from 'mongodb'


export default async function handler(req, res) {
    if (req.method == 'POST') {

        const postId = req.body.postId;
        console.log(postId);

        let session = await getServerSession(req, res, authOptions);

        const db = (await connectDB).db('forum');
        let found;

        try {
            const postIdObject = new ObjectId(postId);
            console.log(postIdObject)
            found = await db.collection('community').findOne({ _id: postIdObject });
            console.log(found.author)
            console.log(session.user.email)
        } catch (error) {
            return res.status(400).json('유효하지 않은 postId');
        }

        if (found.author == session.user.email) {
            let result = await db.collection('community').deleteOne({ _id: new ObjectId(postId) });
            return res.status(200).json('삭제완료');
        } else {
            return res.status(500).json('현재유저와 작성자 불일치');
        }
    }
}