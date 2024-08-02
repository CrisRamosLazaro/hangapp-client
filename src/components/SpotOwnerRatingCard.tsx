import { useContext, useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react'
import { AuthContext } from '@/contexts/auth.context'
import RatingStars from "./RatingStars"
import pencil from '@/assets/icons/pencil.svg'
import close from '@/assets/icons/close.svg'
import check from '@/assets/icons/check.svg'
import { User } from 'types/user'
import spotServices from '@/services/spot.services'
import Loader from './Loader'

interface SpotOwnerRatingCardProps {
    spotId: string
    owner: User
    userReview: string
    userRating: number
}

const SpotOwnerRatingCard: React.FC<SpotOwnerRatingCardProps> = ({ spotId, owner, userReview, userRating }) => {

    const { user } = useContext(AuthContext)

    const indexBasedRating = userRating - 1

    const [isEditingForm, setIsEditingForm] = useState<boolean>(false)
    const [editedReview, setEditedReview] = useState<string>(userReview)
    const [editedRating, setEditedRating] = useState<number>(indexBasedRating)
    const [textareaHeight, setTextareaHeight] = useState<string>('auto')
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const pRef = useRef<HTMLParagraphElement>(null)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (userReview === '') {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }

    }, [userReview])

    useEffect(() => {
        if (pRef.current && !isLoading) {
            const paddedField = pRef.current.scrollHeight + 5
            setTextareaHeight(`${paddedField}px`)
        }
    }, [userReview, isLoading])

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto'
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
        }
    }, [isEditingForm, editedReview])

    useEffect(() => {
        setEditedReview(userReview)
        setEditedRating(indexBasedRating)
    }, [userReview, userRating])

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setEditedReview(e.target.value)
    }

    const handleRatingChange = (newRating: number) => {
        setEditedRating(newRating)
    }

    const handleEditForm = () => {
        setIsEditingForm(true)
    }

    const handleSaveChanges = async () => {
        setIsEditingForm(false)

        try {
            const spotEditableData = {
                userReview: editedReview,
                userRating: editedRating + 1
            }
            setEditedReview(spotEditableData.userReview)
            await spotServices.editSpot(spotId, spotEditableData)
        } catch (err) {
            console.error(err)
        }
    }

    const handleCancelEditing = () => {
        setIsEditingForm(false)
        setEditedReview(userReview)
        setEditedRating(indexBasedRating)
    }

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loader />
                </div>
            ) : (
                <div className="flex flex-col flex-grow lg:flex-row lg:justify-between lg:items-stretch gap-4">
                    <div className='lg:w-2/12 '>
                        <h1 className="font-bold text-left">Curator's review:</h1>
                    </div>

                    {!isEditingForm ? (
                        <>
                            <div className='flex flex-col items-start lg:w-9/12 '>
                                <div className="flex justify-start w-full">
                                    <p
                                        key={`review-editing-${isEditingForm.toString()}`}
                                        ref={pRef}
                                        className="text-left border-2 border-transparent"
                                    >
                                        {editedReview}
                                    </p>
                                </div>
                                <div className="flex flex-col items-start w-full ">
                                    <RatingStars
                                        userRating={editedRating}
                                        isEditing={false}
                                        onChange={handleRatingChange}
                                    />
                                    <p>- {owner.firstName} {owner.lastName}</p>
                                </div>
                            </div>

                            <div className='flex justify-end items-end lg:w-1/12 flex-grow '>
                                {
                                    (user!._id === owner._id || user!.role === 'ADMIN') &&
                                    <button onClick={handleEditForm}>
                                        <img src={pencil} alt='save' className="w-6 h-6" />
                                    </button>
                                }
                            </div>
                        </>
                    ) : (
                        <>

                            <div className='flex flex-col items-start lg:w-9/12 '>
                                <div className="flex justify-start w-full">
                                    <textarea
                                        key={`review-editing-${isEditingForm.toString()}`}
                                        value={editedReview}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border-2 border-yellow-300 rounded-md px-2"
                                        style={{ minHeight: textareaHeight }}
                                    />
                                </div>
                                <div className="flex flex-col items-start w-full ">
                                    <RatingStars
                                        key={`rating-editing-${isEditingForm.toString()}`}
                                        userRating={editedRating}
                                        isEditing={true}
                                        onChange={handleRatingChange}
                                    />
                                    <p className="text-gray-300">- {owner.firstName} {owner.lastName}</p>
                                </div>
                            </div>

                            <div className='flex justify-end items-center lg:w-1/12 flex-grow '>
                                {
                                    (user!._id === owner._id || user!.role === 'ADMIN') &&
                                    <>
                                        <button onClick={handleSaveChanges}>
                                            <img src={check} alt='save' className="w-6 h-6" />
                                        </button>
                                        <button onClick={handleCancelEditing} className="ml-8">
                                            <img src={close} alt='close' className="w-6 h-6" />
                                        </button>
                                    </>
                                }
                            </div>

                        </>
                    )
                    }
                </div>
            )}
        </>
    )

}

export default SpotOwnerRatingCard