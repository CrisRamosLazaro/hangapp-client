import { Link } from 'react-router-dom'
import { SpotData } from 'types/spot'

const SpotCard: React.FC<SpotData> = ({ city, spotImg, description, name, userRating, _id }) => {

    return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 min-w-4">

            <img className="w-full h-1/2 rounded-t-lg" src={spotImg} alt={description} />

            <div className="flex flex-col justify-center items-center p-4 bg-white rounded-lg shadow border border-gray-200">

                <article>
                    <h1 className="text-xl font-bold mb-2">
                        {name}
                    </h1>
                    <hr />
                </article>

                <div>
                    {
                        description === 'data not available'
                            ? ''
                            : <h1 className="mb-3">{description}</h1>
                    }
                    <h1 className="font-bold">City: {city} </h1>
                    <h1 className="font-bold">Rating: {userRating}</h1>

                    <div className="d-grid">
                        <button className="mt-3 bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded">
                            <Link to={`/spots/${_id}`}>
                                View Details
                            </Link>
                        </button>
                    </div>
                </div>


            </div>

        </div >
    )
}


export default SpotCard