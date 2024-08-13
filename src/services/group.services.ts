import createApiClient from './apiClient'
import { GroupCreationData } from 'types/group'

class GroupServices {

    private api = createApiClient(`${import.meta.env.VITE_API_URL}/groups`)

    createGroup(groupData: GroupCreationData) {
        return this.api.post('/create-group', groupData)
    }

    getAllGroups() {
        return this.api.get('/all-groups')
    }

    getOneGroup(group_id: string) {
        return this.api.get(`/${group_id}`)
    }

    joinGroup(group_id: string, user_id: string) {
        return this.api.put(`/${group_id}/join`, { user_id })
    }

    leaveGroup(group_id: string, user_id: string) {
        return this.api.put(`/${group_id}/leave`, { user_id })
    }

    deleteGroup(group_id: string) {
        return this.api.delete(`/${group_id}/delete`)
    }
}

const groupServices = new GroupServices()

export default groupServices