'use client'


export default function CommunityDeleteBtn({ postId }) {

    const handleDelete = async () => {
        try {
            const request = await fetch('/api/community/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postId })
            });
            if (request.status === 200) {
                const result = await request.json();
                console.log(result);
                window.location.reload()
            } else {
                console.error('삭제 실패');
            }
        } catch (error) {
            console.error('삭제 오류', error);
        }
    };

    //return <button onClick={handleDelete}>delete</button>;
    return <button className="delete-btn" onClick={handleDelete}>지우기</button>;
}