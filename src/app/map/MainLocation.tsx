'use client'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import React, { useEffect } from 'react'

const MainLocation = () => {

    const mapContainerStyle = {
        width : '100%',
        height : '844px',
    }

    const center = {
        lat : 34.672314,
        lng : 135.484802
    }


    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={10}
            >
                <Marker position={center}/>
            </GoogleMap>
        </LoadScript>
    )
}

export default MainLocation