import React, { state } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


const MyMapComponent = withScriptjs(withGoogleMap((props) => {
    return <GoogleMap
        defaultZoom={20}

        defaultCenter={{ lat: 24.9027545, lng: 67.1144576 }}
    >
        {props.isMarkerShown && <Marker
            position={{ lat: 24.9027545, lng: 67.1144576 }}
            draggable={true}

        />}

    </GoogleMap>
}
))

export default MyMapComponent