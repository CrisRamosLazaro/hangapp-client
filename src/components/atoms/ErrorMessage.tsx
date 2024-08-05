import { ErrorMessageProps } from "types/errors"

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        !message ? (
            null
        ) : (
            <div className="bg-red-500 text-white text-center text-sm p-2 rounded">
                {message}
            </div>)
    )
}

export default ErrorMessage