import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { connectDB } from '@/util/database'
import 'app/style.css'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import DormitoryViewPost from './dormitoryViewPost'
import CommunityDeleteBtn from './CommunityDeleteBtn'

export default async function Board() {

    const db = (await connectDB).db("forum")
    let result = await db.collection('community').find().toArray()
    let user = await db.collection('user_cred').find().toArray()
    let session = await getServerSession(authOptions)

    const filteredResults = session ? result.filter((item) => (session.user.dormitory == item.dormitory))
        : result;

    return (
        <form>
            <div className="board_wrap">
                <div className="board_title">
                    <strong>커뮤니티 게시판 {session ? "(" + session.user.name + "님)" : "(글을 작성하려면 로그인 해주세요)"}</strong>
                </div>
                <div className="board_list_wrap">
                    <div className="board_list">
                        <div className="top">
                            <div className="num">번호</div>
                            <div className="title">제목</div>
                            <div className="writer">글쓴이</div>
                            <div className="date">작성일</div>
                            <div className="delete">삭제</div>
                        </div>

                        {/* 커뮤니티 게시팔 글 (로그인 시에만 필터링 됨) */}
                        {filteredResults.reverse().map((item, index) => (
                            <div key={index}>
                                <div className="num">
                                    {filteredResults.length - index}
                                </div>
                                <div className="title">
                                    <Link href={"/board/detail/" + item._id}>
                                        {item.title}
                                    </Link>
                                </div>
                                <div className="writer">{item.name}</div>
                                <div className="date">{item.date}</div>
                                <div className="delete">
                                    {session && session.user.email == item.author && (
                                        <CommunityDeleteBtn postId={item._id.toString()} />
                                    )}
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="board_page">
                        <a href="#" className="bt first">&lt;&lt;</a>
                        <a href="#" className="bt prev">&lt;  </a>
                        <a href="#" className="num on">1</a>
                        <a href="#" className="num">2</a>
                        <a href="#" className="num">3</a>
                        <a href="#" className="num">4</a>
                        <a href="#" className="num">5</a>
                        <a href="#" className="bt next">&gt;</a>
                        <a href="#" className="bt last">&gt;&gt;</a>
                    </div>
                    <div className="bt_wrap">
                        {session ? <Link href='/board/write'>등록</Link> : null}
                    </div>
                </div>
            </div>
        </form>
    )
}
