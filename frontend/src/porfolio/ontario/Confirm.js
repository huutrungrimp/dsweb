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
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

import { useState, useEffect } from "react";
import moment from "moment";

const Confirm = ({ mapData, graphData, date }) => {
  console.log(graphData);
  const demograph =
    graphData === undefined
      ? ""
      : graphData.demograph === undefined
      ? ""
      : graphData.demograph.age;
  console.log(demograph);

  // Good reference: https://sqlite.in/?qa=352263/&show=352264

  const [newdata, setNewData] = useState([]);
  const [phuName, setPhuName] = useState("Ontario");

  const d =
    graphData["epi"] === undefined
      ? ""
      : graphData["epi"][phuName] === undefined
      ? ""
      : graphData["epi"][phuName];
  console.log(d);

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

  const confirm = mapData;

  var length = Object.keys(confirm).length;

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
      fillColor: getColor(feature.properties.epidata["confirmed"][yes]),
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
              data={confirm === undefined ? "" : confirm}
              onEachFeature={singlephu}
            />
          </MapContainer>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          <div style={{ width: "100%", height: "400px" }}>
            <h6 style={{ textAlign: "center" }}>Covid-19 Trend reported by</h6>
            <h6 style={{ textAlign: "center" }}>{phuName} PHU</h6>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart width={150} height={40} data={newdata}>
                <Bar dataKey="confirmed" fill="#a85632" />
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
          </div>
          <div style={{ width: "100%", height: "350px" }}>
            <h6 style={{ textAlign: "center" }}>Covid-19 Trend by age groups</h6>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                width={500}
                height={300}
                data={demograph}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Case_Reported_Date" minTickGap={50} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="20s"
                  stroke="red"
                  dot={false}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="30s"
                  stroke="green"
                  dot={false}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="40s"
                  stroke="blue"
                  dot={false}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="50s"
                  stroke="#92a314"
                  dot={false}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="60s"
                  stroke="purple"
                  dot={false}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="70s"
                  stroke="grey"
                  dot={false}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="80z"
                  stroke="orange"
                  dot={false}
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="90s" stroke="#82ca9d" />
                {/* <Line type="monotone" dataKey="UNKNOWN" stroke="#82ca9d" /> */}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Confirm;
