export interface SpotData {
    placeId?: string
    name: string
    description: string
    spotImg?: string
    photoReference?: string
    category: string
    phone: string
    openHours: string
    // address: {
    //     city: string
    //     streetAddress?: string
    //     location: {
    //         type: string
    //         coordinates: number[]
    //     }
    // }
    // location?: {
    //     type: {
    //         type: String,
    //         enum: ['Point']
    //         required: true
    //     },
    //     coordinates: {
    //         type: [Number],
    //         required: true
    //     }
    // }
    userRating?: string
    userReview?: string
    owner: string
    comment?: string
    [key: string]: string
}