import { useState, useContext, useEffect, ChangeEvent, FormEvent } from "react"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '@/contexts/auth.context'
import spotsService from "@/services/spots.services"
import FormField from "@/components/form-fields/FormField"
import SelectFormField from "@/components/form-fields/SelectFormField"
import spotFields from "@/consts/spotFields"
import { SpotData } from "types/spot"
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import useScript from "@/hooks/useScript"

const CreateSpotForm = () => {

    const { user } = useContext(AuthContext)

    useScript(url) // how can I have a frontend url that will contain my api key exposed in the browser?!?

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
        userRating: '',
        userReview: '',
        owner: user!._id,
        comment: '',
    })

    const [address, setAddress] = useState<string>()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSpotData({ ...spotData, [name]: value })
    }

    const handleChange = (address: string) => setAddress(address)

    const handleSelect = (address: string) => {
        geocodeByAddress(address)
            .then(results => console.log("MIRACLE IF IT WORKS", results))
            // .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    }

    const fetchPredictions = async (input: string) => {
        const response = await fetch(`/api/places?input=${input}`)
        const data = await response.json()
        return data.predictions
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        spotsService
            .createSpot(spotData)
            .then(() => {
                navigate(`/spots`)
            })
            .catch(err => console.log(err))
    }

    return (

        <div className="flex justify-center md:w-5/6">
            <div className="md:w-1/4 p-4">

                <form onSubmit={handleSubmit}>

                    <PlacesAutocomplete
                        value={address}
                        onChange={handleChange}
                        onSelect={handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: '',
                                    })}
                                />
                                <div className="">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? 'text-blue-500 g-gray-100 cursor-pointer'
                                            : 'text-inherit';

                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>

                    {spotFields.map(field => {
                        const { label, htmlFor, placeholder, type, autoComplete, id, component, optionsArr } = field
                        return (

                            component === 'select' ? (
                                <SelectFormField
                                    key={id}
                                    label={label}
                                    htmlFor={id}
                                    id={id}
                                    placeholder={placeholder}
                                    type={type}
                                    autoComplete={autoComplete}
                                    value={spotData[id] || ""}
                                    optionsArr={optionsArr}
                                    name={id}
                                    onChange={handleInputChange}
                                />

                            ) :
                                (< FormField
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
                                />)
                        )
                    })}

                    <div className="d-grid mt-5">
                        <button
                            type="submit"
                            className="mt-3 bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded"
                        >
                            Create Place
                        </button>
                    </div>

                </form>

            </div>
        </div>

    )
}

export default CreateSpotForm