import CreateCommentForm from "./forms/CreateCommentForm"
import CommentCard from "./CommentCard"
import { CommentThreadProps, CommentData } from "types/comment"
import commentServices from "@/services/comment.services"
import { useEffect, useState, useCallback } from "react"
import Loader from "./Loader"

const CommentThread: React.FC<CommentThreadProps> = ({ spotId }) => {

    const [comments, setComments] = useState<CommentData[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const loadComments = useCallback(() => {
        setIsLoading(true)
        commentServices
            .getAllSpotsComments(spotId)
            .then(resp => { setComments(resp.data) })
            .catch(err => console.error(err))
            .finally(() => setIsLoading(false))
    }, [spotId])

    useEffect(() => loadComments(), [loadComments])

    return (
        <div className="flex flex-col p-4 rounded-lg shadow-md border border-gray-200 w-5/6">
            {
                isLoading
                    ? (<Loader />)
                    : comments.length === 0
                        ? <p>No comments yet. 🤔</p>
                        : comments.map((comment: CommentData) => (
                            <CommentCard key={comment._id} {...comment} spotId={spotId} refreshCommentFeed={loadComments} />
                        ))
            }
            <CreateCommentForm refreshCommentFeed={loadComments} />
        </div>
    )
}

export default CommentThread