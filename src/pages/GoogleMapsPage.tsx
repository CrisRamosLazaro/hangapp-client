import { GoogleMap, MarkerF } from '@react-google-maps/api'
import googleMapStyle from '@/assets/GoogleMapStyle'

const containerStyle = {
    width: '100vw',
    height: '400px',
}

interface GoogleMapsPageProps {
    address: string
    location: {
        coordinates: number[]
    }
}

const GoogleMapsPage: React.FC<GoogleMapsPageProps> = ({ address, location: { coordinates } }) => {


    const center = {
        lng: coordinates[0],
        lat: coordinates[1]
    }

    return (

        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15} options={{ styles: googleMapStyle }}>
            <MarkerF position={center} title={address} />
        </GoogleMap>
    )

}

export default GoogleMapsPage