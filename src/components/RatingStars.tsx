import { useState, useEffect } from 'react'
import { RatingStarsProps } from 'types/formField'

const RatingStars: React.FC<RatingStarsProps> = ({ userRating, onChange, isEditing }) => {

    const [currentRating, setCurrentRating] = useState<number>(userRating)
    const [ratingOnHover, setRatingOnHover] = useState<number | null>(null)
    const [hasClicked, setHasClicked] = useState<boolean>(false)

    useEffect(() => {
        setCurrentRating(userRating)
    }, [userRating])

    const handleMouseEnter = (index: number) => {
        setRatingOnHover(index)
    }

    const handleMouseLeave = () => {
        setRatingOnHover(null)
    }

    const handleClick = (index: number) => {
        setHasClicked(true)
        setCurrentRating(index)
        onChange(index)
    }

    const handleResetRating = () => {
        setHasClicked(true)
        setCurrentRating(-1)
        onChange(-1)
    }

    const getStarDisplay = (index: number) => {
        if (ratingOnHover !== null) {
            return index <= ratingOnHover ? '★' : '☆'
        }
        return currentRating === 0 ? '☆' : (index <= currentRating ? '★' : '☆')
    }

    return (
        <div>
            {isEditing ? (
                <div>
                    {Array.from({ length: 5 }, (_, i) => (
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
                    <span
                        onClick={handleResetRating}
                        style={{ cursor: 'pointer', marginLeft: '10px' }}
                    >
                        zero
                    </span>
                </div>
            ) : (
                <div>
                    {Array.from({ length: 5 }, (_, i) => (
                        <span key={i}>
                            {getStarDisplay(i)}
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}

export default RatingStars