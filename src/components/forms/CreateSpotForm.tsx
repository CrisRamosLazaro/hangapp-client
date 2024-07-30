import { useState, useContext, useEffect, ChangeEvent, FormEvent, KeyboardEvent } from "react"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '@/contexts/auth.context'
import spotsService from "@/services/spot.services"
import FormField from "@/components/form-fields/FormField"
import CheckboxFormField from "@/components/form-fields/CheckBoxFormField"
import spotFields from "@/consts/spotFields"
import { initialValues } from "@/consts/spotFormInitialValues"
import { SpotCreationData } from "types/spot"
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import RatingStars from "../RatingStars"

const CreateSpotForm = () => {

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    const initialObject: SpotCreationData = {
        ...initialValues,
        owner: user!._id,
        userRating: 0,
        userReview: '',
    }

    const [spotData, setSpotData] = useState<SpotCreationData>(initialObject)
    const [dataUpdated, setDataUpdated] = useState(false)
    const [googlePlace, setGooglePlace] = useState<string>('')
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [editedRating, setEditedRating] = useState<number>(0)

    useEffect(() => {
        setDataUpdated(true)
        console.log("DATA UPDATED", spotData)
    }, [spotData])


    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const { name, value } = e.target

        if (name.includes('.')) {
            const [firstLevel, nested] = name.split('.')
            setSpotData(prevState => ({
                ...prevState,
                [firstLevel]: {
                    ...prevState[firstLevel],
                    [nested]: value
                }
            }))
        } else {
            setSpotData({ ...spotData, [name]: value })
        }
    }

    const handleCategoryChange = (selected: string[]) => {
        setSelectedCategories(selected)
        setSpotData({ ...spotData, categories: selected })
    }

    const handleRatingChange = (newRating: number) => {
        setEditedRating(newRating + 1)
        setSpotData({ ...spotData, userRating: newRating + 1 })
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            setSpotData(initialObject)
        }
    }

    const handleChange = (suggestion: string) => setGooglePlace(suggestion)

    async function handleSelect(suggestion: string) {

        try {
            const results = await geocodeByAddress(suggestion)
            const { place_id } = results[0]
            const res = await spotsService.getOneSpot(place_id)
            const formattedPlace = res.data
            setSpotData({ ...spotData, ...formattedPlace })
        } catch (error) {
            console.error('Error in handleSelect', error)
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        spotsService
            .createSpot(spotData)
            .then(() => {
                navigate(`/spots`)
            })
            .catch(err => console.error(err))
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

                            component === 'checkbox' ? (
                                <CheckboxFormField
                                    key={id}
                                    optionsArr={optionsArr}
                                    selectedOptions={selectedCategories}
                                    onChange={handleCategoryChange}
                                    placeholder={placeholder}
                                />
                            ) : component === 'rating-stars' ? (
                                <div key={id} className="flex justify-between items-center w-full bg-transparent border-none shadow-md outline-none p-2 rounded-md bg-no-repeat bg-right-10-center bg-20 focus:bg-yellow-100 focus:bg-opacity-50">
                                    <p>{label}</p>
                                    <RatingStars
                                        userRating={0}
                                        isEditing={true}
                                        onChange={handleRatingChange}
                                    />
                                </div>
                            ) : (
                                <div key={id}>
                                    < FormField

                                        label={label}
                                        htmlFor={id}
                                        placeholder={placeholder}
                                        type={type}
                                        autoComplete={autoComplete}
                                        value={id !== 'city' ? spotData[id] : spotData.address[id]}
                                        name={id !== 'city' ? id : `address.${id}`}
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

            </div >

        </div >

    )
}

export default CreateSpotForm