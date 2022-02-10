import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ActiveCases from "./ActiveCases";
import Deaths from "./Deaths";
import { Container, Row, Col } from "react-bootstrap";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { Outlet } from "react-router-dom";
import Confirm from "./Confirm";

export default function DashBoardON({ mapData, graphData }) {
  console.log(mapData, graphData);
  const [value, setValue] = React.useState("active");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [date, setDate] = React.useState(
    new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
  );
  console.log(date);

  return (
    <Container style={{ marginTop: "70px", paddingTop: "20px" }}>
      <h1>Covid-19 Trend in Ontario</h1>
      <Box>
        <TabContext value={value}>
          <Row>
            <Col>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Confirm" value="confirm" />
                  <Tab label="Active" value="active" />
                  <Tab label="Deaths" value="death" />
                </TabList>
              </Box>
            </Col>
            <Col>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Select a date"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Col>
            <TabPanel value="confirm">
              <Confirm
                mapData={mapData}
                graphData={graphData}
                date={date}
              />
            </TabPanel>
            <TabPanel value="active">
              <ActiveCases
                mapData={mapData}
                graphData={graphData}
                date={date}
              />
            </TabPanel>
            <TabPanel value="death">
              <Deaths mapData={mapData} graphData={graphData} date={date} />
            </TabPanel>
          </Row>
        </TabContext>
      </Box>

      <Outlet />
    </Container>
  );
}
