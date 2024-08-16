import createApiClient from './apiClient'
import { ChatMsgCreationData } from 'types/chat'

class ChatServices {

    private api = createApiClient(`${import.meta.env.VITE_API_URL}/chat`)

    createChatMsg(group_id: string, msgData: ChatMsgCreationData) {
        return this.api.post(`/${group_id}/new-msg`, msgData)
    }

    getAllChatMsgs(group_id: string) {
        return this.api.get(`/${group_id}`)
    }

}

const chatServices = new ChatServices()

export default chatServices