import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

class UserService {

    private api: AxiosInstance

    constructor() {

        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/users`
        })

        this.api.interceptors.request.use((config: InternalAxiosRequestConfig) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers.Authorization = `Bearer ${storedToken}`
            }

            return config
        })
    }

    getAllUsers() {
        return this.api.get(`/getAllUsers`)

    }
    getOneUser(id: string) {
        return this.api.get(`/${id}`)
    }

    editUser(id: string, editData: any) {
        return this.api.put(`/${id}/edit`, editData)
    }


    deleteUser(id: string) {
        return this.api.delete(`/${id}/delete`)
    }
}

const userService = new UserService()

export default userService
