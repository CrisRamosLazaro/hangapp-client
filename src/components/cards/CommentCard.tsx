import { useState, useContext, ChangeEvent } from "react"
import { AuthContext } from "@/contexts/auth.context"
import { MessageContext } from "@/contexts/message.context"
import { CommentCardProps } from "types/comment"
import trashCan from '@/assets/icons/trash-can.svg'
import pencil from '@/assets/icons/pencil.svg'
import close from '@/assets/icons/close.svg'
import check from '@/assets/icons/check.svg'
import commentServices from '@/services/comment.services'


const CommentCard: React.FC<CommentCardProps> = ({ content, owner, _id, spotId, refreshCommentFeed }) => {

    const { user } = useContext(AuthContext)
    const { emitMessage } = useContext(MessageContext)

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editedContent, setEditedContent] = useState<string>(content)

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setEditedContent(e.target.value)
    }

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = () => {
        setIsEditing(false)

        commentServices
            .editComment(spotId, _id, editedContent)
            .then(() => {
                refreshCommentFeed()
                emitMessage("comment_edited", "success")
            })
            .catch(err => console.error(err))
    }

    const handleCancelEditing = () => {
        setIsEditing(false)
        setEditedContent(content)
    }

    const handleDelete = () => {
        commentServices.deleteComment(spotId, _id)
            .then(() => {
                refreshCommentFeed()
                emitMessage("comment_deleted", "success")
            })
            .catch(err => console.error(err))
    }

    return (
        <div className="flex justify-between w-full bg-transparent border-none shadow-md outline-none py-2 px-4 rounded-md bg-no-repeat bg-right-10-center bg-20 focus:bg-yellow-100 focus:bg-opacity-50 ">

            <div className="flex flex-shrink-0 items-center justify-center w-16 h-16 overflow-hidden relative rounded-full">
                <img
                    className="w-auto h-auto min-w-full min-h-full object-cover transform scale-125"
                    src={owner.avatar}
                    alt={`${owner.firstName} ${owner.lastName}`}
                />
            </div>

            {!isEditing
                ?
                <div className="flex flex-grow justify-between ml-4 py-2 px-4 bg-gray-300 rounded-md">
                    <div className="flex flex-col flex-grow justify-start items-start mr-8">
                        <p className="text-sm text-left font-bold">{owner.firstName} {owner.lastName}</p>
                        <p className="text-sm text-left">{content} </p>
                    </div>
                    <div className="flex justify-end items-center">
                        {(user!._id === owner._id || user!.role === 'ADMIN') &&
                            <>
                                <button onClick={handleEdit} className="">
                                    <img src={pencil} alt='edit' className="w-6 h-6" />
                                </button>
                                <button onClick={handleDelete} className="ml-8">
                                    <img src={trashCan} alt='delete' className="w-6 h-6" />
                                </button>
                            </>
                        }
                    </div>
                </div>
                :
                <div className="flex flex-grow justify-between ml-4 py-2 px-4 bg-white rounded-md shadow-md">
                    <div className="flex flex-col flex-grow justify-start items-start mr-8 ">
                        <textarea
                            value={editedContent}
                            onChange={handleInputChange}
                            className="w-full bg-transparent focus:px-2"
                        />
                    </div>
                    <div className="flex justify-end items-center">
                        {(user!._id === owner._id || user!.role === 'ADMIN') &&
                            <>
                                <button onClick={handleSave}>
                                    <img src={check} alt='save' className="w-6 h-6" />
                                </button>
                                <button onClick={handleCancelEditing} className="ml-8">
                                    <img src={close} alt='close' className="w-6 h-6" />
                                </button>
                            </>
                        }
                    </div>
                </div>
            }
        </div >
    )
}

export default CommentCard