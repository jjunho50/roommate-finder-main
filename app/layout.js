
import Link from 'next/link'
import './globals.css'
import LoginBtn from './LoginBtn'
import LogoutBtn from './LogoutBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions)
  return (
    <html lang="ko">
      <body>
        <div className="navbar">
          <Link href="/" className="logo">RoommateFinder</Link>
          {session ? <LogoutBtn /> : <LoginBtn />}
          {session ? null : <Link href={"/register"}><button>회원가입</button></Link>}
          <Link href="/">룸메이트</Link>
          <Link href="/board">커뮤니티</Link>
        </div>
        {children}
      </body>
    </html>
  )
}
