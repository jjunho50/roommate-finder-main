import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { connectDB } from '@/util/database'
import 'app/style.css'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import DeleteBtn from './deleteBtn'

export default async function Home() {
  const db = (await connectDB).db("forum")
  let result = await db.collection('post').find().toArray()
  let user = await db.collection('user_cred').find().toArray()
  let session = await getServerSession(authOptions)

  const filteredResults = session
    ? result.filter((item) => session.user.sleepTime == item.sleepTime && session.user.smoking == item.smoking && session.user.gender == item.gender && session.user.wakeupTime == item.wakeupTime && session.user.cleaning && item.cleaning && session.user.dormitory == item.dormitory)
    : result.reverse();

  // post collection의 모든 데이터 출력

  return (
    < form >
      <div className="board_wrap">
        <div className="board_title">
          <strong>룸메이트 게시판 {session ? "(" + session.user.name + "님)" : "(글을 작성하려면 로그인 해주세요)"}</strong>
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


            {/* 룸메이트 게시판 (로그인 시에만 필터링 된다) */}
            {filteredResults.map((item, index) => (
              <div key={index}>
                <div className="num">
                  {filteredResults.length - index}
                </div>
                <div className="title">
                  <Link href={"/detail/" + item._id}>
                    {item.title}
                  </Link>
                </div>
                <div className="writer">{item.name}</div>
                <div className="date">{item.date}</div>
                <div className="delete">
                  {session && (session.user.email == item.author && (
                    <DeleteBtn postId={item._id.toString()} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="board_page">
            <a href="#" className="bt first">	&lt;&lt;</a>
            <a href="#" className="bt prev">	&lt;  </a>
            <a href="#" className="num on">1</a>
            <a href="#" className="num">2</a>
            <a href="#" className="num">3</a>
            <a href="#" className="num">4</a>
            <a href="#" className="num">5</a>
            <a href="#" className="bt next">&gt;</a>
            <a href="#" className="bt last">&gt;&gt;</a>
          </div>
          <div className="bt_wrap">
            {session ? <Link href='/write'>등록</Link> : null}
          </div>
        </div>
      </div>
    </form >
  )
}

