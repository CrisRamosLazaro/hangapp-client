import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { CommentData } from 'types/comment'

class CommentServices {

    private api: AxiosInstance

    constructor() {

        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/comments`
        })

        this.api.interceptors.request.use((config: InternalAxiosRequestConfig) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers.Authorization = `Bearer ${storedToken}`
            }

            return config
        })
    }

    createComment(commentData: CommentData) {
        return this.api.post(`/create-comment`, commentData)
    }

}

const spotServices = new CommentServices()

export default spotServices