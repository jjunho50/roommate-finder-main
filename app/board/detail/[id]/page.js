import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import 'app/style.css'
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import Comment from "./Comment"


export default async function Detail(props) {
    let session = await getServerSession(authOptions)
    const db = (await connectDB).db("forum")
    let result = await db.collection('community').findOne({ _id: new ObjectId(props.params.id) })
    return (
        <form className="board_wrap">
            <div className="board_title">
                <strong>커뮤니티 게시판 {session ? null : "(댓글을 작성하려면 로그인 해주세요)"}</strong>
            </div>
            <div className="board_view_wrap">
                <div className="board_view">
                    <div className="title">
                        {result.title}
                    </div>
                    <div className="info">
                        <dl>
                            <dt>글쓴이</dt>
                            <dd>{result.name}</dd>
                        </dl>
                        <dl>
                            <dt>작성일</dt>
                            <dd>{result.date}</dd>
                        </dl>
                    </div>
                    <div className="cont">
                        {result.content}
                    </div>
                </div>
                {session ? <Comment _id={result._id.toString()} /> : null}
                <div className="bt_wrap">
                    <a href="/" className="on">목록</a>
                    {session && session.user.email == result.author ? <Link href={'/board/edit/' + new ObjectId(props.params.id)}>수정</Link> : null}
                </div>
            </div>
        </form>
    )
}