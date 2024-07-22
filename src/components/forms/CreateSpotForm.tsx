import { useState, useContext, useEffect, ChangeEvent, FormEvent, KeyboardEvent } from "react"
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

    const initialValues: SpotData = {
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
        openHours: '',
        userRating: '',
        userReview: '',
        owner: user!._id,
        comment: '',
    }

    const navigate = useNavigate()

    const [spotData, setSpotData] = useState<SpotData>(initialValues)

    useEffect(() => {
        console.log("CHANGE?", spotData)
    }, [spotData])

    const [googlePlace, setGooglePlace] = useState<string>('')

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target
        setSpotData({ ...spotData, [name]: value })
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            setSpotData(initialValues)
        }
    };

    const handleChange = (suggestion: string) => setGooglePlace(suggestion)

    const handleSelect = (suggestion: string) => {
        setGooglePlace(suggestion)
        geocodeByAddress(googlePlace)
            .then(results => {
                const { place_id } = results[0]
                return spotsService.getOneSpot(place_id)
            })
            .then(res => {
                const formattedPlace = res.data
                setSpotData({ ...spotData, ...formattedPlace })
            })
            .catch(error => console.error('Error in handleSelect', error))
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
            <div className="p-4">

                <form onSubmit={handleSubmit}>

                    <PlacesAutocomplete
                        value={googlePlace}
                        onChange={handleChange}
                        onSelect={handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (

                            <div className="mb-3 w-full">
                                <input
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'bg-transparent border-none shadow-md outline-none p-2 rounded-md w-full'
                                    })}
                                    onKeyDown={handleKeyDown}
                                />
                                <div className="shadow-md">

                                    {loading && <div>Loading...</div>}

                                    {suggestions.map((suggestion, i) => {
                                        const className = `text-left py-1 px-2 max-w-4/6 ${suggestion.active
                                            ? 'text-yellow-700 g-gray-100 cursor-pointer'
                                            : 'text-inherit'}`

                                        const { key, ...suggestionItemProps } = getSuggestionItemProps(suggestion, {
                                            className
                                        })

                                        return (
                                            <div key={i} {...suggestionItemProps}>
                                                <span>{suggestion.description}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>

                    {spotFields.map(field => {
                        const { label, placeholder, type, autoComplete, id, component, optionsArr } = field
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
                                (<div key={id}>
                                    < FormField

                                        label={label}
                                        htmlFor={id}
                                        placeholder={placeholder}
                                        type={type}
                                        autoComplete={autoComplete}
                                        value={spotData[id] || spotData.address?.[id] || ''}
                                        name={id}
                                        id={id}
                                        onChange={handleInputChange}
                                    />
                                    {id === 'spotImg' && <img src={spotData[id]} />}
                                </div>
                                )
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