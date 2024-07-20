import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

class SpotsService {

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

    createSpot(spotData: any) {
        return this.api.post(`/create-spot`, spotData)
    }

    getAllSpots() {
        return this.api.get('/get-all-spots')
    }

    getOneSpot(spot_id: string) {
        return this.api.get(`/get-one-spot/${spot_id}`)
    }

    getUserSpots(user_id: string) {
        return this.api.get(`/${user_id}/getUserSpots`)
    }

    getSpotInfo(spot_id: string) {
        return this.api.get(`/${spot_id}/get-spot-info`)
    }

    addFaveSpot(spot_id: string, user_id: string) {
        return this.api.put(`/${spot_id}/add-to-favorites`, user_id)
    }

    removeFaveSpot(spot_id: string, user_id: string) {
        return this.api.put(`/${spot_id}/remove-from-favorites`, user_id)
    }

    editSpot(spot_id: string, spotData: any) {
        return this.api.put(`/${spot_id}/edit`, spotData)
    }

    deleteSpot(spot_id: string) {
        return this.api.delete(`/${spot_id}/delete`)
    }

}

const spotsService = new SpotsService()

export default spotsService
