import { useState } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet'

function LocationMarker() {

  const phuName = 'Ottawa'
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      setPosition(phuName)
    },
  })
  console.log(position)

  return position === null ? null : (
    'true'
  )
}


function Test() {
  return (
    <MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  )
}
export default Test