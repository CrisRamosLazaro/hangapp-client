import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { CommentCreationData } from 'types/comment'

class CommentServices {

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

    createComment(commentData: CommentCreationData) {
        return this.api.post(`/create-comment`, commentData)
    }

    getAllSpotsComments(spot_id: string) {
        return this.api.get(`/${spot_id}/comments`)
    }

    editComment(spot_id: string, comment_id: string, content: string) {
        return this.api.put(`/${spot_id}/comments/${comment_id}/edit`, { content })
    }

    deleteComment(spot_id: string, comment_id: string) {
        return this.api.delete(`/${spot_id}/comments/${comment_id}/delete`)
    }

}

const commentServices = new CommentServices()

export default commentServices