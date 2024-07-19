import { useState, useContext, ChangeEvent, FormEvent } from "react"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '@/contexts/auth.context'
import spotsService from "@/services/spots.services"
import FormField from "./FormField"
import spotFields from "@/consts/spotFields"
import { SpotData } from "types/spot"

const CreateSpotForm = () => {

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    const [spotData, setSpotData] = useState<SpotData>({
        placeId: '',
        name: '',
        description: '',
        spotImg: '',
        photoReference: '',
        category: '',
        phone: '',
        openHours: '',
        city: '',
        streetAaddress: '',
        latitude: '',
        longitude: '',
        userRating: '',
        userReview: '',
        owner: '',
        comments: '',
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSpotData({ ...spotData, [name]: value })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        spotsService
            .createSpot(spotData)
            .then(() => {
                navigate(`/profile/${user!.id}`)
            })
            .catch(err => console.log(err))
    }

    return (

        <div className="flex justify-center">
            <div className="md:w-10/12">
                <div className="p-4">

                    <form onSubmit={handleSubmit}>

                        {spotFields.map(field => {
                            const { label, htmlFor, placeholder, type, autoComplete, id } = field
                            return (
                                < FormField
                                    key={id}
                                    label={label}
                                    htmlFor={htmlFor}
                                    placeholder={placeholder}
                                    type={type}
                                    autoComplete={autoComplete}
                                    value={spotData[id]}
                                    name={id}
                                    id={id}
                                    onChange={handleInputChange}
                                />
                            )
                        })}

                        <div className="d-grid mt-5">
                            <button type="submit">Create Place</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>

    )
}

export default CreateSpotForm