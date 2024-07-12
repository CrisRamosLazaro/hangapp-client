import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

class AuthService {

    private api: AxiosInstance

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/auth`
        })

        this.api.interceptors.request.use((config: InternalAxiosRequestConfig) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers.Authorization = `Bearer ${storedToken}`
            }

            return config
        })
    }

    signup(userData: any) {
        return this.api.post('/signup', userData)
    }

    login(userData: any) {
        return this.api.post('/login', userData)
    }

    verify(token: string) {
        return this.api.get('/verify', { headers: { Authorization: `Bearer ${token}` } })
    }
}

const authService = new AuthService()

export default authService