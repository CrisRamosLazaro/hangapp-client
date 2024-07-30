import { useEffect, useState } from 'react'
import spotServices from '@/services/spot.services'
import userServices from '@/services/user.services'
import heartEmpty from '@/assets/icons/heart-empty.svg'
import heartFull from '@/assets/icons/heart-full.svg'

interface FavoriteButtonProps {
    spotId: string
    userId: string
    myFaves: string[]
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ spotId, userId, myFaves }) => {

    const [isFave, setIsFave] = useState(false)

    useEffect(() => {
        userServices
            .getOneUser(userId)
            .then((resp) => {
                const userFaves = resp.data.faveSpots
                setIsFave(userFaves.includes(spotId))
            })
            .catch(err => console.error(err))
    }, [userId])


    useEffect(() => {
        setIsFave(myFaves.includes(spotId))
    }, [myFaves])

    const handleAddToFaves = () => {
        spotServices
            .addSpotToUserFaves(spotId, userId)
            .then(() => setIsFave(true))
            .catch(err => console.error(err))
    }

    const handleRemoveFromFaves = () => {
        spotServices
            .removeSpotFromUserFaves(spotId, userId)
            .then(() => setIsFave(false))
            .catch(err => console.error(err))
    }

    return (
        <>
            {
                !isFave
                    ?
                    <button
                        onClick={handleAddToFaves}
                    >

                        <img src={heartEmpty} alt="add to favorites" className="w-6 h-6 ml-2 md:mt-2" />
                    </button>
                    :
                    <button
                        onClick={handleRemoveFromFaves}
                    >
                        <img src={heartFull} alt="remove from favorites" className="w-6 h-6 ml-2 md:mt-2" />
                    </button>
            }
        </>
    )
}

export default FavoriteButton