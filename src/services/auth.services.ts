import createApiClient from './apiClient'
import { UserSignupData, LoginData } from 'types/user'

class AuthService {

    private api = createApiClient(`${import.meta.env.VITE_API_URL}/auth`)

    signup(userData: UserSignupData) {
        return this.api.post('/signup', userData)
    }

    login(userData: LoginData) {
        return this.api.post('/login', userData)
    }

    verify(token: string) {
        return this.api.get('/verify', { headers: { Authorization: `Bearer ${token}` } })
    }
}

const authService = new AuthService()

export default authService