import { useState, useEffect } from 'react'
import { RatingStarsProps } from 'types/formField'


const RatingStars: React.FC<RatingStarsProps> = ({ userRating, onChange, isEditing }) => {

    const [currentRating, setCurrentRating] = useState<number>(userRating)
    const [ratingOnHover, setRatingOnHover] = useState<number | null>(userRating)
    const [hasClicked, setHasClicked] = useState<boolean>(false)
    // const [hasHovered, setHasHovered] = useState<boolean>(false)

    useEffect(() => {
        setCurrentRating(userRating)
    }, [userRating])

    const starsDisplay = ['☆', '☆', '☆', '☆', '☆']

    const newStarsDisplay = starsDisplay.map((star, i) => {
        if (userRating === 0) {
            return '☆'
        } else if (i < userRating && userRating !== 0) {
            return '★'
        } else {
            return '☆'
        }
    })

    const handleMouseEnter = (i: number) => {
        setRatingOnHover(i)
    }

    const handleMouseLeave = () => {
        if (!hasClicked) {
            setRatingOnHover(null)
        }
    }

    const handleClick = (index: number) => {
        setHasClicked(true)
        setCurrentRating(index)
        onChange(index)
    }

    const getStarDisplay = (index: number) => {
        if (ratingOnHover !== null) {
            return index <= ratingOnHover ? '★' : '☆'
        }
        return currentRating === 0 ? '☆' : (index <= currentRating ? '★' : '☆')
    }

    return (
        <div>
            {!isEditing
                ? <>{newStarsDisplay.join('')}</>
                : <>
                    {starsDisplay.map((star, i) => (
                        <span
                            key={i}
                            onMouseEnter={() => handleMouseEnter(i)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick(i)}
                            style={{ cursor: 'pointer' }}
                        >
                            {getStarDisplay(i)}
                        </span>
                    ))}
                </>
            }

        </div>
    )
}

export default RatingStars