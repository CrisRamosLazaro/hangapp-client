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
        type: "text",
        autoComplete: "description",
        id: "description",
        placeholderIcon: 'placeholder-dark-grafitti bg-email-input-light',
    },
    {
        label: 'image',
        placeholder: 'image',
        // type: "file",
        type: "text",
        autoComplete: "off",
        id: "spotImg",
        placeholderIcon: 'placeholder-dark-grafitti bg-email-input-light',
    },
    // {
    //     label: 'Photo Reference',
    //     htmlFor: "photoReference",
    //     placeholder: 'image',
    //     type: "file",
    //     autoComplete: "off",
    //     id: "photoReference",
    //     placeholderIcon: 'placeholder-dark-grafitti bg-email-input-light',
    // },
    {
        component: "select",
        optionsArr: spotCategories,
        label: 'category',
        placeholder: 'category',
        type: "text",
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
        type: "text",
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
]

export default spotFields

// streetAaddress: '',
// latitude: '',
// longitude: '',
// userRating: '',
// userReview: '',
// owner: '',
// comments: '',