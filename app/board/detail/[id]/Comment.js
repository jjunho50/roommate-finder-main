'use client'

import { useEffect, useState } from "react"
import './style.css'

export default function Comment(props) {
    let [comment, setComment] = useState(' ')
    let [data, setData] = useState([])
    useEffect(() => {
        fetch('/api/comment/list?id=' + props._id).then(r => r.json())
            .then((result) => {
                setData(result)


            })
    }, [])


    return (
        <div>
            <hr></hr>
            {
                data.length > 0 ?
                    data.map((a, i) =>

                        <p key={i} className="comment-box">
                            <div className="name-box">
                                <span>{a.author_name}</span>
                            </div>



                            <div className="cotent-box">
                                <span>{a.content}</span>
                            </div>

                        </p>

                    )
                    : ''
            }
            <input className="input-comment" placeholder="댓글을 입력해주세요" onChange={(e) => { setComment(e.target.value) }} />
            <button onClick={() => {
                console.log(comment)
                fetch('/api/comment/new', {
                    method: 'POST',
                    body: JSON.stringify({ comment: comment, _id: props._id })
                })

            }} className="submit">댓글전송</button>

        </div>
    )


}
