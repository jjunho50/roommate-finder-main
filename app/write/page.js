import 'app/style.css'

export default async function Write() {
    return (
        <form action="/api/post/new" method="POST" className="board_wrap">
            <div className="board_title">
                <strong>자기소개</strong>
            </div>
            <div className="board_write_wrap">
                <div className="board_write">
                    <div className="title">
                        <dl>
                            <dt>제목</dt>
                            <dd><input type="text" name="title" placeholder="제목 입력" required /></dd>
                        </dl>

                    </div>
                    <div className="cont">
                        <textarea name="content" placeholder="내용 입력" required></textarea>
                    </div>
                    <div>
                        <input name="date" style={{ display: 'none' }} defaultValue={new Date().toLocaleDateString()} />
                    </div>
                </div>
                <div className="bt_wrap">
                    <button type="submit">등록</button>
                </div>
            </div>
        </form>
    )
}