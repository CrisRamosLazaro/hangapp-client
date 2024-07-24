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

export interface SpotData {
    placeId?: string
    name: string
    description: string
    spotImg?: string
    // photoReference?: string[]
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

export interface SpotDeetsData {
    placeId?: string
    name: string
    description: string
    spotImg?: string
    // photoReference?: string[]
    categories: string[]
    phone: string
    openHours: string[]
    address: Address
    userRating?: string
    userReview?: string
    owner: User
    comment?: string
    [key: string]: any
}