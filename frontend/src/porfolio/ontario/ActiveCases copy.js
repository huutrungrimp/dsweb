import { Col, Container, Row } from "react-bootstrap";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
} from "recharts";
import { useState, useEffect } from "react";
import moment from "moment";

const ActiveCases = ({ mapData, graphData, date }) => {
  console.log(mapData, graphData);
  // Good reference: https://sqlite.in/?qa=352263/&show=352264

  const [newdata, setNewData] = useState([]);
  const [phuName, setPhuName] = useState("Ontario");

  const d =
    graphData["active"] === undefined
      ? ""
      : graphData["active"][phuName] === undefined
      ? ""
      : graphData["active"][phuName];
  console.log(d);

  useEffect(() => {
    const datesAlreadyListed = [];
    console.log(d.length);
    for (let i = 0; i < d.length; i++) {
      const newdate = moment(new Date(d[i]["file_date"])).unix();
      // console.log(newdate);
      datesAlreadyListed.push(newdate);
      d[i].newdate = newdate;
      const year = d[i]["file_date"].split("-")[0].substring(0, 4);
      // console.log(year);
      if (!datesAlreadyListed.includes(year)) {
        datesAlreadyListed.push(year);
        d[i].year = year;
      }
    }
    setNewData(d);
  }, [d]);

  console.log(newdata);

  const yes = date === undefined ? "" : date.toLocaleDateString("en-CA");
  console.log(yes);

  const acON = mapData.active;

  var length = Object.keys(acON).length;

  const singlephu = (feature, layer) => {
    const phuName = feature.properties.phu_name;
    layer.bindPopup(phuName);
    layer.on({
      click: (e) => {
        console.log(e.target);
        setPhuName(phuName.toUpperCase());
      },
    });
  };

  console.log(phuName);
  console.log(graphData["active"][phuName]);

  function getColor(d) {
    return d > 1000000
      ? "#800026"
      : d > 500000
      ? "#BD0026"
      : d > 2000
      ? "#E31A1C"
      : d > 1000
      ? "#FC4E2A"
      : d > 500
      ? "#FD8D3C"
      : d > 20
      ? "#FEB24C"
      : d > 10
      ? "#FED976"
      : "#FFEDA0";
  }

  function style(feature) {
    return {
      fillColor: getColor(feature.properties[yes]),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
      dateFormate: "mm/dd/yy",
    };
  }

  const formatXAxis = (tickFormat) => {
    return moment.unix(tickFormat).format("MMM-YYYY");
  };

  const formatYAxis = (label) => {
    return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return length === 0 ? (
    <div>Loading</div>
  ) : (
    <Container fluid="true">
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <MapContainer
            style={{ marginTop: "10px" }}
            center={[49.7, -85]}
            zoom={5}
            scrollWheelZoom={true}
          >
            <TileLayer
              style={{ width: "100%" }}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON
              style={style}
              data={acON === undefined ? "" : acON}
              onEachFeature={singlephu}
            />
          </MapContainer>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          {/* <h6>Covid-19 trend reported by {phuName}</h6> */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={40} data={newdata}>
              <Bar dataKey="active_cases" fill="red" />
              <XAxis
                xAxisId={0}
                dataKey="file_date"
                interval="preserveEnd"
                minTickGap={50}
                style={{
                  fontSize: "15px",
                  fontFamily: "Times New Roman",
                }}
              />
              <XAxis
                dataKey="newdate"
                xAxisId={5}
                tickFormatter={(tick) => formatXAxis(tick)}
                type={"category"}
                tickSize={1}
                strokeWidth={1}
                // strokeColor='red'
                strokeDasharray="4"
                minTickGap={50}
                style={{
                  fontSize: "1rem",
                  fontFamily: "Times New Roman",
                }}
              />
              <YAxis tickFormatter={(tick) => formatYAxis(tick)} />
              <Tooltip />
              <Brush dataKey="name" height={20} stroke="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default ActiveCases;
