import { User } from "./user"
import { CommentData } from "./comment"

interface Location {
    type: Point
    coordinates: number[]
}

interface Address {
    city: string
    streetAddress?: string
    location: Location
}

export interface SpotCreationData {
    placeId?: string
    name: string
    description: string
    heroImg: string
    photoOptions: string[]
    categories: string[]
    phone: string
    openHours: string[]
    address: Address
    userReview: string
    userRating: number
    owner: string
    comment?: string
    [key: string]: any
}

export interface SpotFullData
    extends Omit<SpotCreationData, 'owner' | 'comment'> {
    owner: User
    comments: CommentData[]
}

export interface SpotEditableData {
    userReview: string
    userRating: number
}