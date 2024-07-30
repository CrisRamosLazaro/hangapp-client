import { useState, useEffect } from 'react'
import { RatingStarsProps } from 'types/formField'


const RatingStars: React.FC<RatingStarsProps> = ({ userRating, onChange, isEditing }) => {

    const [currentRating, setCurrentRating] = useState<number>(userRating)
    const [rateOnHover, setRateOnHover] = useState<number | null>(userRating)
    const [starsDisplay, setStarsDisplay] = useState<string[]>(['☆', '☆', '☆', '☆', '☆'])


    // useEffect(() => {
    //     console.log("current", currentRating)
    //     const fullStars = Math.floor(userRating)
    //     const hasHalfStar = userRating % 1 >= 0.5

    //     const newStarsDisplay = starsDisplay.map((star, i) => {
    //         if (currentRating === 0) {
    //             return '☆'
    //         }
    //         if (i < fullStars && currentRating !== 0) {
    //             return '★'
    //         } else if (i === fullStars && hasHalfStar) {
    //             return '✦'
    //         }
    //         else {
    //             return '☆'
    //         }
    //     })
    //     setStarsDisplay(newStarsDisplay)
    // }, [userRating])

    const handleMouseEnter = (index: number) => {
        setCurrentRating(index)
        setRateOnHover(index)
    }

    const handleMouseLeave = () => {
        setRateOnHover(null)
    }

    const handleClick = (index: number) => {
        setCurrentRating(index)
        onChange(index)
    }

    const getStarDisplay = (index: number) => {
        if (rateOnHover !== null) {
            return index <= rateOnHover ? '★' : '☆'
        }
        return index <= currentRating && currentRating !== 0 ? '★' : '☆'
    }

    return (
        <div>
            {!isEditing
                ? <>{starsDisplay.join('')}</>
                : <>
                    {[1, 2, 3, 4, 5].map((star, index) => (
                        <span
                            key={index}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick(index)}
                            style={{ cursor: 'pointer' }}
                        >
                            {getStarDisplay(index)}
                        </span>
                    ))}
                </>
            }

        </div>
    )
}

export default RatingStars