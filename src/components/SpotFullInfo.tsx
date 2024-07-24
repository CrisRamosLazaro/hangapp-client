import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '@/contexts/auth.context'
import { SpotDeetsData } from 'types/spot'

const SpotFullInfo: React.FC<SpotDeetsData> = ({ name, spotImg, description, owner, address, categories, phone, openHours, userReview, userRating }) => {

    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const deetsList = [
        { 'Description:': description },
        { 'Categories:': categories },
        { 'Address:': address.streetAddress },
        { 'City:': address.city },
        { 'Phone:': phone },
    ]

    return (
        <div className="flex flex-col p-4 rounded-lg shadow-md border border-gray-200 w-5/6">

            <div className="w-full rounded-t-lg h-[350px] overflow-hidden">
                <img
                    className="w-full object-cover rounded-t-lg"
                    src={spotImg}
                    alt={description}
                />
            </div>

            <div className="flex flex-col justify-center items-stretch rounded-b-lg">

                <div className="flex flex-col md:flex-row justify-between items-center">

                    <div className="flex items-center justify-start md:items-start w-full md:w-1/2 h-24 p-1">
                        <h1 className="text-lg font-bold py-2 m-0">
                            {name}
                        </h1>
                    </div>

                    <div className="flex w-full md:w-1/2 justify-end items-center h-24 p-1">
                        <div className="flex flex-col justify-center h-20 px-8">
                            <p className="font-bold text-right">Curated by:</p>
                            <p className="text-right">{owner.firstName} {owner.lastName}</p>
                            <Link to={`/profile/${owner._id}`}>
                                <p className="text-right text-sm">Check out their profile!</p>
                            </Link>
                        </div>
                        <div className="flex items-center w-20 h-20">
                            <img className='object-cover rounded-full ' src={owner.avatar} alt={`${owner.firstName} ${owner.lastName}`} />
                        </div>
                    </div>
                </div>

                <hr className="border-gray-400" />

                <div className="flex justify-between items-start my-8">

                    <div className="flex flex-grow items-center shadow overflow-hidden sm:rounded-md w-full md:w-1/2 md:h-80">
                        <ul className="divide-y divide-gray-200">
                            {deetsList.map((deet, i) => (
                                <li key={i}>
                                    <div className="py-2 px-8 text-left">
                                        {Object.entries(deet).map(([key, value]) => (
                                            <p key={key}><strong>{key}</strong> {value}</p>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center shadow overflow-hidden sm:rounded-md w-full md:w-1/2 md:h-80">
                        <ul className="divide-y divide-gray-200">
                            {openHours.map((day: string, i: number) => (
                                <li key={i}>
                                    <div className="py-2 px-8 text-left">
                                        {day}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex justify-center align-middle items-center bg-slate-600 w-full h-[400px]">
                    GOOGLE MAP HERE
                </div>

                <div className="flex justify-between align-middle items-center">
                    <h1>Curator's review:</h1>
                    <p>{userReview}</p>
                    <p>{userRating}</p>
                </div>



                <div className="d-grid">
                    <button className="mt-3 bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded">
                        <Link to={`/spots/`}>
                            Back to all spots
                        </Link>
                    </button>
                </div>
            </div>


        </div >
    )

}

export default SpotFullInfo