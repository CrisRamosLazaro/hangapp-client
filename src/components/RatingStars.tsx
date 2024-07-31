import { useState, useEffect } from 'react'
import { RatingStarsProps } from 'types/formField'


const RatingStars: React.FC<RatingStarsProps> = ({ userRating, onChange, isEditing }) => {

    const [currentRating, setCurrentRating] = useState<number>(userRating)
    const [ratingOnHover, setRatingOnHover] = useState<number | null>(userRating)
    const [hasClicked, setHasClicked] = useState<boolean>(false)
    const [hasHovered, setHasHovered] = useState<boolean>(false)

    // useEffect(() => {
    //     setCurrentRating(userRating)
    //     console.log("UserRating in STARS", userRating)
    //     console.log("currentRating in STARS", currentRating)
    // }, [userRating])

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
        setHasHovered(true)
        setRatingOnHover(i)
    }

    const handleMouseLeave = () => {
        if (!hasClicked) {
            setRatingOnHover(null)
        }
    }

    const handleClick = (index: number) => {
        setHasClicked(true)
        onChange(index)
    }

    const getStarDisplay = (index: number) => {
        if (ratingOnHover !== null) {
            return index <= ratingOnHover ? '★' : '☆'
        }
        return '☆'
    }

    return (
        <div>
            {!isEditing
                ? <>{newStarsDisplay.join('')}</>
                : !hasHovered
                    ? <div onMouseEnter={() => handleMouseEnter(0)} >
                        {newStarsDisplay.join('')}
                    </div>
                    : <>
                        {starsDisplay.map((star, i) => {
                            !hasClicked
                                ? (
                                    <span
                                        key={i}
                                        onMouseEnter={() => handleMouseEnter(i)}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => handleClick(i)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {getStarDisplay(i)}
                                    </span>
                                ) : (
                                    <span
                                        key={i}
                                        onClick={() => handleClick(i)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {getStarDisplay(i)}
                                    </span>
                                )
                        }
                        )}
                    </>
            }

        </div>
    )
}

export default RatingStars