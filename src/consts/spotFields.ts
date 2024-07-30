import spotCategories from "./spotCategories"

const spotFields = [

    {
        label: 'name',
        placeholder: 'name',
        type: "text",
        autoComplete: "name",
        id: "name",
        placeholderIcon: 'placeholder-dark-grafitti bg-email-input-light',
    },
    {
        label: 'description',
        placeholder: 'description',
        type: "textarea",
        autoComplete: "description",
        id: "description",
        placeholderIcon: 'placeholder-dark-grafitti bg-email-input-light',
    },
    {
        label: 'image',
        placeholder: 'image',
        type: "text",
        autoComplete: "off",
        id: "spotImg",
        placeholderIcon: 'placeholder-dark-grafitti bg-email-input-light',
    },
    {
        component: "checkbox",
        optionsArr: spotCategories,
        label: 'category',
        placeholder: 'categories',
        type: "checkbox",
        autoComplete: "category",
        id: "category",
        placeholderIcon: 'placeholder-dark-grafitti bg-email-input-light',
    },
    {
        label: 'phone number',
        placeholder: 'phone',
        type: "tel",
        autoComplete: "phone",
        id: "phone",
        placeholderIcon: 'placeholder-dark-grafitti bg-email-input-light',
    },
    {
        label: 'open hours',
        placeholder: 'open hours',
        type: "textarea",
        autoComplete: "openHours",
        id: "openHours",
        placeholderIcon: 'placeholder-dark-grafitti bg-email-input-light',
    },
    {
        label: 'city',
        placeholder: 'city',
        type: "text",
        autoComplete: "city",
        id: "city",
        placeholderIcon: 'placeholder-dark-grafitti bg-email-input-light',
    },
    {
        label: 'your review',
        placeholder: 'your review',
        type: "textarea",
        autoComplete: "off",
        id: "userReview",
        placeholderIcon: 'placeholder-dark-grafitti bg-email-input-light',
    },
    {
        component: 'rating-stars',
        label: 'rate this place',
        id: "userRating",
        //The only way CreateSpotForm would work (?!)
        type: '',
        optionsArr: ["none"],
        placeholder: ''
    },
]

export default spotFields