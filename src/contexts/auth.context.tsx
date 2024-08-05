import { createContext, useState, ReactNode, useEffect } from "react"
import authService from "@/services/auth.services"
import { User } from "types/user"
import { AuthContextInterface } from "types/auth"

const defaultState: AuthContextInterface = {
    user: null,
    setUser: () => { },
    authenticateUser: () => { },
    storeToken: () => { },
    logout: () => { },
    isLoading: false,
}

const AuthContext = createContext(defaultState)

type AuthProviderProps = {
    children: ReactNode
}

const AuthProviderWrapper = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
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
                .then(({ data }: { data: User }) => {
                    setUser(data)
                    setIsLoading(false)
                })
                .catch(err => {
                    console.error("Authentication error:", err)
                    logout()
                })
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