import SpotFullInfo from "@/components/SpotFullInfo"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { initialValues } from "@/consts/spotFormInitialValues"
import { SpotFullData } from "types/spot"
import spotServices from "@/services/spot.services"
import Loader from "@/components/Loader"
import CommentThread from "@/components/CommentThread"

const SpotFullInfoPage = () => {

    const { spot_id } = useParams()

    const initialObject: SpotFullData = {
        ...initialValues,
        owner: {
            _id: '',
            firstName: '',
            lastName: '',
            avatar: ''
        },
        comments: [],
    }

    const [spotInfo, setSpotInfo] = useState<SpotFullData>(initialObject)

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
            {spotInfo === initialObject &&
                <Loader />
            }
            <SpotFullInfo {...spotInfo} />
            <CommentThread spotId={spot_id!} />
        </div>
    )
}

export default SpotFullInfoPage