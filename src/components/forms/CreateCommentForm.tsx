import FormField from "@/components/form-fields/FormField"
import { useState, useContext, ChangeEvent, FormEvent } from 'react'
import { AuthContext } from "@/contexts/auth.context"
import { CommentData } from "types/comment"
import commentServices from "@/services/comment.services"

const CreateCommentForm: React.FC = () => {

    const { user } = useContext(AuthContext)

    const [commentData, setCommentData] = useState<CommentData>({
        content: '',
        owner: user!._id
    })

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target
        setCommentData({ ...commentData, [name]: value })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        commentServices
            .createComment(commentData)
            .catch(err => console.log(err))

        console.log("linked!")
    }

    return (
        <div className="flex flex-col p-4 rounded-lg shadow-md border border-gray-200 w-5/6">

            <form onSubmit={handleSubmit}>
                <FormField
                    label="Your comment"
                    htmlFor="comment"
                    placeholder="write a comment"
                    type="textarea"
                    autoComplete="on"
                    value={commentData.content}
                    name="content"
                    id="comment"
                    onChange={handleInputChange}
                />

                <div className="d-grid mt-5">
                    <button
                        type="submit"
                        className="mt-3 bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded"
                    >
                        Post
                    </button>
                </div>

            </form>
        </div>
    )
}

export default CreateCommentForm