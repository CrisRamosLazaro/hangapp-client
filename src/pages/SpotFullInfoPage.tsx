import SpotFullInfo from "@/components/SpotFullInfo"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { SpotFullData } from "types/spot"
import spotServices from "@/services/spot.services"
import Loader from "@/components/Loader"
import CreateCommentForm from "@/components/forms/CreateCommentForm"

const SpotFullInfoPage = () => {

    const { spot_id } = useParams()

    const initialValues: SpotFullData = {
        placeId: '',
        name: '',
        description: '',
        spotImg: '',
        categories: [],
        phone: '',
        address: {
            city: '',
            streetAddress: '',
            location: {
                type: 'Point',
                coordinates: []
            }
        },
        openHours: [],
        userRating: '',
        userReview: '',
        owner: {
            _id: '',
            firstName: '',
            lastName: '',
            avatar: ''
        },
        comments: [],
    }

    const [spotInfo, setSpotInfo] = useState<SpotFullData>(initialValues)

    const loadSpotInfo = async () => {

        try {
            const response = await spotServices.getSpotFullInfo(spot_id!)
            setSpotInfo(response.data)

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        loadSpotInfo()
    }, [spot_id])

    return (
        <div className='flex flex-col justify-center items-center min-h-full'>
            {spotInfo === initialValues &&
                <Loader />
            }
            <SpotFullInfo {...spotInfo} />
            <CreateCommentForm />
        </div>
    )
}

export default SpotFullInfoPage