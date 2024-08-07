import createApiClient from './apiClient'
import { CommentCreationData } from 'types/comment'

class CommentServices {

    private api = createApiClient(`${import.meta.env.VITE_API_URL}/spots`)

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