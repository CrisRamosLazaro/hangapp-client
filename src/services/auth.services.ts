import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { SignupData, LoginData } from 'types/user'

class AuthService {

    private api: AxiosInstance

    constructor() {

        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/auth`
        })

        this.api.interceptors.request.use((config: InternalAxiosRequestConfig) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers.Authorization = `Bearer ${storedToken}`
            }

            return config
        })
    }

    signup(userData: SignupData) {
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