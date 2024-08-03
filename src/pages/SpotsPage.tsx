import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import spotServices from '@/services/spot.services'
import SpotCard from '@/components/cards/SpotCard'
import { SpotFullData } from 'types/spot'


const SpotsPage = () => {

    const [spotsData, setSpotsData] = useState<SpotFullData[]>([])
    const [spotsDataBackup, setSpotsDataBackup] = useState()

    useEffect(() => {
        loadUserSpots()
    }, [])

    const loadUserSpots = () => {
        spotServices
            .getAllSpots()
            .then(({ data }) => {
                setSpotsData(data)
                setSpotsDataBackup(data)
            })
            .catch(err => console.error(err))
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