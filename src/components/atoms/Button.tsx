import { ButtonProps } from "types/button"

const Button: React.FC<ButtonProps> = ({ text, ...props }) => {

    return (
        <button
            className="mt-3 bg-yellow-600 hover:bg-yellow-500 text-white py-2 px-4 rounded"
            {...props}
        >
            {text}
        </button>
    )
}

export default Button