import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { GroupCreationData } from 'types/group'

class GroupServices {

    private api: AxiosInstance

    constructor() {

        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/groups`
        })

        this.api.interceptors.request.use((config: InternalAxiosRequestConfig) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers.Authorization = `Bearer ${storedToken}`
            }

            return config
        })
    }

    createGroup(groupData: GroupCreationData) {
        return this.api.post(`/create-group`, groupData)
    }

    getAllGroups() {
        return this.api.get(`/all-groups`)
    }

    deleteGroup(group_id: string) {
        return this.api.delete(`/${group_id}/delete`)
    }

}

const groupServices = new GroupServices()

export default groupServices