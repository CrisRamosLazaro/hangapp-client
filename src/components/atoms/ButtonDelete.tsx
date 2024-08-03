import { ButtonHTMLAttributes } from 'react'
import trashCan from '@/assets/icons/trash-can-white.svg'

const ButtonDelete: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...props }) => {

    return (
        <button
            className="flex justify-center items-center w-32 bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            {...props}
        >
            <img src={trashCan} className="w-8 h-8" />
            <p className="pl-2">Delete</p>
        </button>
    )
}

export default ButtonDelete