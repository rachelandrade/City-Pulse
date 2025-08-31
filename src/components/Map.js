import { TileLayer, Marker, Popup, MapContainer} from 'react-leaflet';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useEffect, useRef } from 'react';
export const Map = ({ location, zoom, scrollWheelZoom }) => {
    const mapRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            mapRef.current?.invalidateSize();
            mapRef.current?.setView(location, zoom); // recenter
        }, 300);
    }, []);

    console.log(location)
    const defaultIcon = L.icon({
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    return (
        <MapContainer ref={mapRef} center={location} zoom={zoom} scrollWheelZoom={scrollWheelZoom} style={{ height: "100%" }} className='map-container'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={location} icon={defaultIcon}>
                <Popup>You're here!</Popup>
            </Marker>
        </MapContainer>
    )
}