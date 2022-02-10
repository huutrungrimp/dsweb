import { GeoJSON, MapContainer } from "react-leaflet";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";


const WorldConfirmMap = () => {

  const [confirm, setConfirm] = useState({});

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/posts/confirm`).then((res) => {
      const item = res.data;
      setConfirm(item)
    });
  }, []);

  var count = Object.keys(confirm).length;
  console.log(count);


  console.log(confirm.length);
  console.log(confirm)

  const yesterday = () => {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  };

  console.log(yesterday());
  const date = yesterday();
  console.log(date);

  const singlecountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    const confirm = country.properties["covid"];
    console.log(confirm);
    layer.bindPopup(countryName);
  };

  function getColor(d) {
    return d > 1000000
      ? "#800026"
      : d > 500000
      ? "#BD0026"
      : d > 2000
      ? "#E31A1C"
      : d > 100
      ? "#FC4E2A"
      : d > 50
      ? "#FD8D3C"
      : d > 20
      ? "#FEB24C"
      : d > 10
      ? "#FED976"
      : "#FFEDA0";
  }

  function style(feature) {
    return {
      fillColor: getColor(feature.properties[date.toString()]),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
      dateFormate: "mm/dd/yy",
    };
  }

  return (
    (count===0)?(<div>Loading</div>):(
      <Container>
        
      <MapContainer center={[20, 0]} zoom={0.5} scrollWheelZoom={true}>
        <h5>Maps</h5>
        <GeoJSON
            style={style}
            data={confirm === undefined ? "" : confirm}
            onEachFeature={singlecountry}
          />
      </MapContainer>
    </Container>
    )
  );
};

export default WorldConfirmMap;
