import { useContext, useState, useEffect, ChangeEvent, FormEvent } from "react"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "@/contexts/auth.context"
import authService from '@/services/auth.services'
import isTokenValid from "@/utils/token-validation.utils"
import { LoginData } from 'types/user'
import { ErrorMessages } from "types/errors"
import userFields from "@/consts/userFields"
import FormField from "@/components/form-fields/FormField"
import Button from "../atoms/Button"
import Loader from "@/components/Loader"
import { MessageContext } from "@/contexts/message.context"


const LoginForm: React.FC = () => {

    const [errorMessages, setErrorMessages] = useState<ErrorMessages>({})
    const [isLoading, setIsLoading] = useState(false)

    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const { user, authenticateUser, storeToken } = useContext(AuthContext)
    const { emitMessage } = useContext(MessageContext)

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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            emitMessage("Welcome back!")
        } catch (err: any) {
            setErrorMessages(err.response.data.errorMessages)
        }
    }


    return (
        <div>
            <div className="px-8 py-4 border border-gray-200 rounded-lg shadow-md">

                {isLoading && <Loader />}

                <form onSubmit={handleSubmit}>

                    {userFields
                        .filter(field => field.id === "email" || field.id === "password")
                        .map(field => {
                            const { label, htmlFor, placeholder, type, autoComplete, id, placeholderIcon } = field

                            return (
                                <div key={id} className="mb-4">
                                    <FormField
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
                                </div>
                            )
                        })}

                    <div className="mt-4">
                        <Button
                            text='Login'
                            type='submit'
                        />
                    </div>

                </form>


            </div>
        </div >
    )
}


export default LoginForm