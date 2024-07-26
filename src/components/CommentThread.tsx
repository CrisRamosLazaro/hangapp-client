import CreateCommentForm from "./forms/CreateCommentForm"
import CommentCard from "./CommentCard"
import { CommentThreadProps, CommentData } from "types/comment"
import commentServices from "@/services/comment.services"
import { useEffect, useState } from "react"

const CommentThread: React.FC<CommentThreadProps> = ({ spotId }) => {

    const [comments, setComments] = useState<CommentData[]>([{
        content: '',
        owner: {
            _id: '',
            firstName: '',
            lastName: '',
            avatar: ''
        },
    }])

    const loadComments = () => {
        commentServices
            .getAllSpotsComments(spotId)
            .then(resp => setComments(resp.data))
    }

    useEffect(() => loadComments(), [spotId])

    return (
        <div className="flex flex-col p-4 rounded-lg shadow-md border border-gray-200 w-5/6">
            {comments.map((comment: any, i: number) => {
                return comment.content === ''
                    ? <p key={i}>No comments yet. 🤔</p>
                    : <CommentCard key={i} {...comment} />
            }
            )}
            <CreateCommentForm refreshCommentFeed={loadComments} />
        </div>
    )
}

export default CommentThread