import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import 'app/style.css'

export default async function Edit(props) {
    const db = (await connectDB).db("forum")
    let result = await db.collection('community').findOne({ _id: new ObjectId(props.params.id) })
    console.log(result)
    return (
        <form action="/api/community/edit" method="POST">
            <div className="board_wrap">
                <div className="board_title">
                    <strong>수정 페이지</strong>
                </div>
                <div className="board_write_wrap">
                    <div className="board_write">
                        <div className="title">
                            <dl>
                                <dt>제목</dt>
                                <dd><input name="title" type="text" defaultValue={result.title} /></dd>
                            </dl>
                        </div>
                        <div className="cont">
                            <textarea type="text" name="content" defaultValue={result.content}></textarea>
                        </div>
                    </div>
                    <div className="bt_wrap">
                        <button type="submit">수정</button>
                    </div>
                </div>
            </div>

            <input style={{ display: 'none' }} name='_id' defaultValue={result._id.toString()} />

        </form>
    )
}