import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { SpotCreationData, SpotFullData } from 'types/spot'

class SpotServices {

    private api: AxiosInstance

    constructor() {

        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/spots`
        })

        this.api.interceptors.request.use((config: InternalAxiosRequestConfig) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers.Authorization = `Bearer ${storedToken}`
            }

            return config
        })
    }

    createSpot(spotData: SpotCreationData) {
        return this.api.post(`/create-spot`, spotData)
    }

    getAllSpots() {
        return this.api.get('/get-all-spots')
    }

    getOneSpot(place_id: string) {
        return this.api.get(`/get-one-spot/${place_id}`)
    }

    getSpotFullInfo(spot_id: string) {
        return this.api.get(`/${spot_id}/get-full-info`)
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

    editSpot(spot_id: string, spotData: SpotFullData) {
        return this.api.put(`/${spot_id}/edit`, spotData)
    }

    deleteSpot(spot_id: string) {
        return this.api.delete(`/${spot_id}/delete`)
    }

}

const spotServices = new SpotServices()

export default spotServices
