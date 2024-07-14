import { createContext, useState, Dispatch, SetStateAction, ReactNode, useEffect } from "react"
import authService from "@/services/auth.services"

interface UserData {
    id: string
    name: string
    email: string
}

interface AuthContextInterface {
    user: UserData
    setUser: Dispatch<SetStateAction<UserData>>
    authenticateUser: () => void
    storeToken: (token: string) => void
    logout: () => void
    isLoading: boolean
}

const defaultState = {
    user: {
        id: '',
        name: '',
        email: '',
    },
    setUser: (user: UserData) => { }
} as AuthContextInterface

const AuthContext = createContext(defaultState)

type AuthProviderProps = {
    children: ReactNode
}

const AuthProviderWrapper = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserData>({
        id: '',
        name: '',
        email: '',
    })
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
        setUser(defaultState.user)
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
            value={{ user, setUser, authenticateUser, storeToken, logout, isLoading }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }