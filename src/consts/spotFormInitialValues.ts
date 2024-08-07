import { Role } from "types/user"

export const initialValues = {
    placeId: '',
    name: '',
    description: '',
    spotImg: '',
    photoOptions: [],
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
    userRating: 0,
    userReview: ''
}

export const spotOwner = {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    avatar: '',
    role: 'MEMBER' as Role,
    faveSpots: []
}