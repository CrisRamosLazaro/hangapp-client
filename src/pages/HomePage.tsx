import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/contexts/auth.context'

const HomePage = () => {

    const { user } = useContext(AuthContext)

    const [placesData, setPlacesData] = useState()

    // useEffect(() => {
    //     loadUserPlaces()
    // }, [])

    // const loadUserPlaces = () => {
    //     placesService
    //         .getAllPlaces()
    //         .then(({ data }) => {
    //             setPlacesData(data.slice(0, 5))
    //         })
    //         .catch(err => console.log(err))
    // }

    return (

        <div className='flex flex-col justify-center items-center h-full'>
            <h1 className='py-4'>HangApp</h1>
            <h4 className='py-4'>Hangout. Make Friends.</h4>
            <div className='rounded py-4 home-container' >
            </div>

        </div>
    )
}
export default HomePage