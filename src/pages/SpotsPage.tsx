import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import spotsServices from '@/services/spots.services'
import SpotCard from "@/components/SpotCard"
import Loader from '@/components/Loader'
// import FilteringPlaces from '../../components/FilteringPlaces/FilteringPlaces'


const SpotsPage = () => {

    const [spotsData, setSpotsData] = useState()
    const [spotsDataBackup, setSpotsDataBackup] = useState()

    useEffect(() => {
        loadUserSpots()
    }, [])

    const loadUserSpots = () => {
        spotsServices
            .getAllSpots()
            .then(({ data }) => {
                setSpotsData(data)
                setSpotsDataBackup(data)
            })
            .catch(err => console.log(err))
    }

    // // TODO OPCIONAL: FILTRAR EN SERVIDOR
    // const filterPlacesByType = (query: any) => {
    //     if (query === "All places") {
    //         setPlacesData(placesDataBackup)
    //     } else {
    //         const filteredPlaces = placesDataBackup.filter(elm => elm.type.includes(query))
    //         setPlacesData(filteredPlaces)
    //     }
    // }


    return (

        <div className='flex flex-col justify-center items-center h-full'>
            Destinations
            {/* <FilteringPlaces filterPlacesByType={filterPlacesByType} /> */}

            <div className="flex flex-wrap -mx-3" 'justify-content-center mt-5'>

            {
                !spotsData
                    ?
                    <div className="md:grid md:grid-cols-12">
                        <Loader />
                    </div>
                    :
                    spotsData.map((spot) => {
                        return (

                            <div className="w-full sm:w-1/2 md:w-1/3 px-3 mb-4" >
                                <Link to={`/spots/${spot._id}`}>
                                    <SpotCard {...spot} />
                                </Link>
                            </div>

                        )
                    })
            }

        </div>
        </div >
        
    )
}


export default SpotsPage