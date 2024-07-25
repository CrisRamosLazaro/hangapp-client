import { User } from "./user"

interface Address {
    city: string
    streetAddress?: string
    location: {
        type: 'Point'
        coordinates: number[]
    }
    [key: string]: any
}

export interface SpotCreationData {
    placeId?: string
    name: string
    description: string
    spotImg?: string
    categories: string[]
    phone: string
    openHours: string[]
    address: Address
    userRating?: string
    userReview?: string
    owner: string
    comment?: string
    [key: string]: any
}

export interface SpotFullData {
    placeId?: string
    name: string
    description: string
    spotImg?: string
    categories: string[]
    phone: string
    openHours: string[]
    address: Address
    userRating?: string
    userReview?: string
    owner: User
    comments: string[]
    [key: string]: any
}