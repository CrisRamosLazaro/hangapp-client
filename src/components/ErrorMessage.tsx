import { ErrorMessageProps } from "types/errors"

const ErrorMessage = ({ message }: ErrorMessageProps) => {

    return !message ? null : <p className="text-red-500 font-mono font-bold">{message}</p>
}

export default ErrorMessage