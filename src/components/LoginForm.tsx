import { useContext, useState, ChangeEvent, FormEvent } from "react"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "@/contexts/auth.context"
import authService from '@/services/auth.services'
import { LoginData } from 'types/user'
import { ErrorMessages } from "types/errors"
import userFields from "@/consts/userFields"
import FormField from "./FormField"


const LoginForm: React.FC = () => {

    const [errorMessages, setErrorMessages] = useState<ErrorMessages>({})

    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const { authenticateUser, storeToken } = useContext(AuthContext)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setErrorMessages(prevErrors => ({ ...prevErrors, [name]: '' }))
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        authService
            .login(loginData)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                navigate(`/spots`)
            })
            .catch(err => setErrorMessages(err.response.data.errorMessages))
    }

    return (
        <div>
            <div className="p-4 border border-gray-200 rounded-lg shadow-md">

                <form onSubmit={handleSubmit}>

                    {userFields
                        .filter(field => field.id === "email" || field.id === "password")
                        .map(field => {
                            const { label, htmlFor, placeholder, type, autoComplete, id, placeholderIconLight, placeholderIconDark } = field

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
                                    placeholderIconLight={placeholderIconLight}
                                    placeholderIconDark={placeholderIconDark}
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