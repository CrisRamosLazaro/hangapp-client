import { useEffect, useState, useContext } from "react"
import { Link } from 'react-router-dom'
import { AuthContext } from "@/contexts/auth.context"
import Loader from "./Loader"
import { CommentData } from "types/comment"


const CommentCard: React.FC<CommentData> = ({ content, owner }) => {

    return (
        <div className="flex justify-between w-full bg-transparent border-none shadow-md outline-none py-2 px-4 rounded-md bg-no-repeat bg-right-10-center bg-20 focus:bg-yellow-100 focus:bg-opacity-50 ">

            <div className="flex flex-shrink-0 items-center justify-center w-16 h-16 overflow-hidden relative rounded-full">
                <img
                    className="w-auto h-auto min-w-full min-h-full object-cover transform scale-125"
                    src={owner.avatar}
                    alt={`${owner.firstName} ${owner.lastName}`}
                />
            </div>

            <div className="flex flex-col flex-grow justify-start items-start ml-4 py-2 px-4 bg-gray-300 rounded-md">
                <p className="text-sm text-left font-bold">{owner.firstName} {owner.lastName}</p>
                <p className="text-sm text-left">{content} </p>

            </div>
        </div>
    )
}

export default CommentCard