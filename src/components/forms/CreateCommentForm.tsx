import FormField from "@/components/form-fields/FormField"
import { useState, useContext, ChangeEvent, FormEvent } from 'react'
import { AuthContext } from "@/contexts/auth.context"
import { CommentCreationData, CreateCommentFormProps } from "types/comment"
import commentServices from "@/services/comment.services"
import { useParams } from 'react-router-dom'
import Button from "../atoms/Button"

const CreateCommentForm: React.FC<CreateCommentFormProps> = ({ refreshCommentFeed }) => {

    const { user } = useContext(AuthContext)
    const { spot_id } = useParams()

    const [commentData, setCommentData] = useState<CommentCreationData>({
        content: '',
        owner: user!._id,
    })

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target
        setCommentData({ ...commentData, [name]: value })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        commentServices
            .createComment(spot_id!, commentData)
            .then(() => {
                setCommentData({ ...commentData, content: '' })
                refreshCommentFeed()
            })
            .catch(err => console.error(err))
    }

    return (
        <div className="">

            <form
                className="flex justify-between items-center mt-4"
                onSubmit={handleSubmit}
            >
                <div className="flex justify-start items-center flex-grow mr-4 ">

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
                </div>

                <div className="">
                    <Button
                        text="Post"
                        type="submit"
                    />
                </div>

            </form>
        </div>
    )
}

export default CreateCommentForm