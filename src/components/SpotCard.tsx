import { Link } from 'react-router-dom'
import { SpotFullData } from 'types/spot'
import Button from './atoms/Button'

const SpotCard: React.FC<SpotFullData> = ({ address, categories, spotImg, description, name, userRating, _id }) => {

    const categoriesEnum = categories?.join(', ')

    return (
        <div className="h-[450px] flex flex-col bg-white p-4 rounded-lg shadow-md border border-gray-200 min-w-4">
            <div
                className='flex-grow-0 flex-shrink-0 w-full rounded-t-lg overflow-hidden relative'
                style={{ height: 'calc(41.6667% - 1rem)' }}
            >
                <img
                    className="object-cover w-full h-full"
                    src={spotImg}
                    alt={description}
                />
            </div>

            <div className="flex flex-col justify-center items-center flex-grow flex-shrink p-4 bg-white rounded-b-lg shadow border border-gray-200" style={{ height: 'calc(58.3333% - 1rem)' }}>

                <article>
                    <h1 className="text-lg font-bold mb-2">
                        {name}
                    </h1>
                    <hr />
                </article>

                <div className="">
                    {
                        description === 'data not available'
                            ? ''
                            : <h1 className="text-sm mb-3 line-clamp-3 px-2 mx-auto">{description}</h1>
                    }
                    <h1 className="text-sm font-bold">Categories: {categoriesEnum || 'n/a'} </h1>
                    <h1 className="text-sm font-bold">City: {address.city} </h1>
                    <h1 className="text-sm font-bold">Rating: {userRating}</h1>

                    <div className="d-grid">
                        <Link to={`/spots/${_id}`}>
                            <Button
                                type="button"
                                text="View Details"
                            />
                        </Link>
                    </div>
                </div>


            </div>

        </div >
    )
}


export default SpotCard