import { useContext, useState, useEffect, ChangeEvent, FormEvent } from "react"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "@/contexts/auth.context"
import authService from '@/services/auth.services'
import isTokenValid from "@/utils/token-validation.utils"
import { LoginData } from 'types/user'
import { ErrorMessages } from "types/errors"
import userFields from "@/consts/userFields"
import FormField from "@/components/form-fields/FormField"
import Loader from "@/components/Loader"


const LoginForm: React.FC = () => {

    const [errorMessages, setErrorMessages] = useState<ErrorMessages>({})
    const [isLoading, setIsLoading] = useState(false)

    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const { user, authenticateUser, storeToken } = useContext(AuthContext)

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if (token && !isTokenValid(token)) {
            localStorage.removeItem('authToken')
        }
    }, [])

    useEffect(() => {
        if (user && isLoading) {
            setIsLoading(false)
            navigate(`/spots`)
        }
    }, [user, isLoading, navigate])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setErrorMessages(prevErrors => ({ ...prevErrors, [name]: '' }))
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const { data } = await authService.login(loginData)
            storeToken(data.authToken)
            authenticateUser()
        } catch (err: any) {
            setErrorMessages(err.response.data.errorMessages)
        }
    }

    return (
        <div>
            <div className="p-4 border border-gray-200 rounded-lg shadow-md">

                {isLoading && <Loader />}

                <form onSubmit={handleSubmit}>

                    {userFields
                        .filter(field => field.id === "email" || field.id === "password")
                        .map(field => {
                            const { label, htmlFor, placeholder, type, autoComplete, id, placeholderIcon } = field

                            return (
                                <FormField
                                    key={id}
                                    label={label}
                                    htmlFor={htmlFor}
                                    placeholder={placeholder}
                                    type={type}
                                    autoComplete={autoComplete}
                                    value={loginData[id]}
                                    name={id}
                                    id={id}
                                    onChange={handleInputChange}
                                    placeholderIcon={placeholderIcon}
                                    error={errorMessages[id]}
                                />
                            )
                        })}

                    <div className="mt-4">
                        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 w-1/2 rounded p-1">LOGIN</button>
                    </div>

                </form>


            </div>
        </div >
    )
}


export default LoginForm