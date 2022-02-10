import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ActiveCases from "../ontario/ActiveCases";
import Deaths from "../ontario/Deaths";
import { Container, Row, Col } from "react-bootstrap";

const WorldDashBoard = ({ acON, deathsON }) => {
  console.log(acON, deathsON);

  const [value, setValue] = React.useState("active");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [date, setDate] = React.useState(
    new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
  );
  console.log(date);

  return (
    <Container>
      <h1>This is the World Dashboard</h1>
      <Box>
        <TabContext value={value}>
          <Row>
            <Col>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
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
              <TabPanel value="active">
                <ActiveCases acON={acON} date={date} />
              </TabPanel>
              <TabPanel value="death">
                <Deaths deathsON={deathsON} date={date} />
              </TabPanel>
          </Row>
        </TabContext>
      </Box>

      <Outlet />
      
    </Container>
  );
};

export default WorldDashBoard;
