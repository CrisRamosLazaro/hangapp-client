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

    deleteGroup(group_id: string) {
        return this.api.delete(`/${group_id}/delete`)
    }
}

const groupServices = new GroupServices()

export default groupServices
