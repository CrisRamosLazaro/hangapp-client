import { createContext, useEffect, useState, ReactNode } from "react"
import authService from "@/services/auth.services"

interface AuthContextType {
    user: any // *to do: replace 'any' with more specific type according to user model when created
    setUser: (user: any) => void
    authenticateUser: () => void
    storeToken: (token: string) => void
    logout: () => void
    isLoading: boolean
}

interface UserData {
    id: string
    name: string
    email: string
}

const AuthContext = createContext<AuthContextType | null>(null)

const AuthProviderWrapper = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null) // *same as above
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        authenticateUser()
    }, [])

    const storeToken = (token: string) => {
        localStorage.setItem('authToken', token)
    }

    const removeToken = () => {
        localStorage.removeItem('authToken')
    }

    const logout = () => {
        setIsLoading(false)
        setUser(null)
        removeToken()
    }

    const authenticateUser = () => {

        const token = localStorage.getItem("authToken")

        if (token) {
            authService
                .verify(token)
                .then(({ data }: { data: UserData }) => {
                    setUser(data)
                    setIsLoading(false)
                })
                .catch(err => logout())
        } else {
            logout()
        }
    }

    return (
        <AuthContext.Provider
        value= {{ user, authenticateUser, storeToken, logout, isLoading }
}
        >
    { children }
    </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }