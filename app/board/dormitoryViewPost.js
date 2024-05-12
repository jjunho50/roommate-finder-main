import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";
import CommunityDeleteBtn from "./CommunityDeleteBtn";

export default async function DormitoryViewPost() {
    const db = (await connectDB).db("forum");
    let result = await db.collection("community").find().toArray();
    let user = await db.collection("user_cred").find().toArray();
    let session = await getServerSession(authOptions);

    const filteredResults = session ? result.filter((item) => (session.user.dormitory === item.dormitory))
        : result.reverse();

    return (
        <>
            {filteredResults.map((item, index) => (
                <div key={index}>
                    <div className="num">
                        {filteredResults.length - index}
                    </div>
                    <div className="title">
                        <Link href={"/community/detail/" + item._id}>
                            {item.title}
                        </Link>
                    </div>
                    <div className="writer">{item.name}</div>
                    <div className="date">{item.date}</div>
                    <div className="delete">
                        {session && session.user.email === item.author && (
                            <CommunityDeleteBtn postId={item._id.toString()} />
                        )}
                    </div>
                </div>
            ))}
        </>
    );
}
