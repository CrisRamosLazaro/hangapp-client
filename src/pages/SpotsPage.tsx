import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import spotsServices from '@/services/spots.services'
import SpotCard from "@/components/SpotCard"
import { SpotData } from 'types/spot'


const SpotsPage = () => {

    const [spotsData, setSpotsData] = useState<SpotData[]>([])
    const [spotsDataBackup, setSpotsDataBackup] = useState()

    useEffect(() => {
        loadUserSpots()
    }, [])

    const loadUserSpots = () => {
        spotsServices
            .getAllSpots()
            .then(({ data }) => {
                console.log("data from getAllSPOTS", data)
                setSpotsData(data)
                setSpotsDataBackup(data)
            })
            .catch(err => console.log(err))
    }


    return (

        <div className='flex flex-col justify-center items-center w-full h-full'>
            <h1 className="text-2xl text-bold">Destinations</h1>

            <div className="flex flex-wrap justify-center w-5/6 mt-5">

                {
                    spotsData.length === 0
                        ?
                        'No Data'
                        :
                        spotsData.map((spot, i) => {
                            return (

                                <div className="w-full sm:w-1/2 md:w-1/3 px-3 mb-4" key={i} >
                                    <SpotCard {...spot} />
                                </div>

                            )
                        })
                }

            </div>
        </div >

    )
}


export default SpotsPage