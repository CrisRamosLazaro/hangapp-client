import createApiClient from './apiClient'
import { SpotCreationData, SpotEditableData } from 'types/spot'

class SpotServices {

    private api = createApiClient(`${import.meta.env.VITE_API_URL}/spots`)

    getOneGooglePlace(place_id: string) {
        return this.api.get(`/get-one-google-place/${place_id}`)
    }

    createSpot(spotData: SpotCreationData) {
        return this.api.post(`/create-spot`, spotData)
    }

    getAllSpots() {
        return this.api.get('/all-spots')
    }

    getOneSpot(spot_id: string) {
        return this.api.get(`/${spot_id}/get-one-spot`)
    }

    getUserSpots(user_id: string) {
        return this.api.get(`/${user_id}/getUserSpots`)
    }

    addSpotToUserFaves(spot_id: string, user_id: string) {
        return this.api.put(`/${spot_id}/add-to-faves`, { user_id })
    }

    removeSpotFromUserFaves(spot_id: string, user_id: string) {
        return this.api.put(`/${spot_id}/remove-from-faves`, { user_id })
    }

    editSpot(spot_id: string, spotData: SpotEditableData) {
        return this.api.put(`/${spot_id}/edit`, spotData)
    }

    deleteSpot(spot_id: string) {
        return this.api.delete(`/${spot_id}/delete`)
    }
}

const spotServices = new SpotServices()

export default spotServices