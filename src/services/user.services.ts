import createApiClient from "./apiClient"

class UserService {

    private api = createApiClient(`${import.meta.env.VITE_API_URL}/users`)

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
