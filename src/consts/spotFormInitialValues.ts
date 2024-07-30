export const initialValues = {
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
}

export const spotOwner = {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    avatar: '',
    role: '',
    faveSpots: []
}