import { useContext, useState, ChangeEvent } from 'react'
import { AuthContext } from '@/contexts/auth.context'
import RatingStars from "./RatingStars"
import pencil from '@/assets/icons/pencil.svg'
import close from '@/assets/icons/close.svg'
import check from '@/assets/icons/check.svg'
import { User } from 'types/user'
import spotServices from '@/services/spot.services'

interface SpotOwnerRatingCardProps {
    spotId: string
    owner: User
    userReview: string
    userRating: number
}

const SpotOwnerRatingCard: React.FC<SpotOwnerRatingCardProps> = ({ spotId, owner, userReview, userRating }) => {

    const { user } = useContext(AuthContext)

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editedReview, setEditedReview] = useState<string>(userReview)
    const [editedRating, setEditedRating] = useState<number>(userRating)

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setEditedReview(e.target.value)
    }

    const handleRatingChange = (newRating: number) => {
        setEditedRating(newRating + 1)
    }

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = async () => {
        setIsEditing(false)

        try {
            const spotEditableData = {
                userReview: editedReview,
                userRating: editedRating
            }
            await spotServices.editSpot(spotId, spotEditableData)
        } catch (err) {
            console.error(err)
        }
    }

    const handleCancelEditing = () => {
        setIsEditing(false)
        setEditedReview(userReview)
        setEditedRating(userRating)
    }

    return (
        <div className="flex flex-col flex-grow lg:flex-row lg:justify-between lg:items-stretch gap-4">
            <div className='lg:w-2/12 '>
                <h1 className="font-bold text-left">Curator's review:</h1>
            </div>

            {!isEditing ? (
                <>
                    <div className='flex flex-col items-start lg:w-9/12 '>
                        <div className="flex justify-start w-full">
                            <p className="text-left">{userReview}</p>
                        </div>
                        <div className="flex flex-col items-start w-full ">
                            <RatingStars
                                userRating={userRating}
                                isEditing={false}
                                onChange={handleRatingChange}
                            />
                            <p>- {owner.firstName} {owner.lastName}</p>
                        </div>
                    </div>

                    <div className='flex justify-end items-center lg:w-1/12 flex-grow '>
                        {
                            (user!._id === owner._id || user!.role === 'ADMIN') &&
                            <button onClick={handleEdit}>
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
                                value={editedReview}
                                onChange={handleInputChange}
                                className="w-full bg-transparent focus:px-2"
                            />
                        </div>
                        <div className="flex flex-col items-end w-full ">
                            <RatingStars
                                userRating={userRating}
                                isEditing={true}
                                onChange={handleRatingChange}
                            />
                            <p>- {owner.firstName} {owner.lastName}</p>
                        </div>
                    </div>

                    <div className='flex justify-end items-center lg:w-1/12 flex-grow '>
                        {
                            (user!._id === owner._id || user!.role === 'ADMIN') &&
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
                </>
            )
            }
        </div>
    )

}

export default SpotOwnerRatingCard