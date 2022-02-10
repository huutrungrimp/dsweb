import { Container } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DashBoardON from "./ontario/DashBoardON";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

const Portfolio = ({ acON, deathsON }) => {
  console.log(acON, deathsON);

  const [value, setValue] = React.useState("ontario");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: purple[800],
      },
      secondary: {
        main: "#aaa795",
      },
    },
    shape: {
      borderRadius: 4,
    },
  });

  return (
    <div style={{ marginTop: "70px", backgroundColor:"#c0c0c0" }}>
      <ThemeProvider theme={theme}>
        <Box>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                width: "100%",
                fontFamily:'sans-serif'
              }}
            >
              <TabList
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                centered
                sx={{ bgcolor: "secondary.main", paddingTop:"10px", paddingBottom:"10px", fontFamily:'arial' }}
              >
                <Tab label="World" value="world" />
                <Tab label="Ontario" value="ontario" />
              </TabList>
            </Box>
            <TabPanel value="world">
              <DashBoardON acON={acON} deathsON={deathsON} />
            </TabPanel>
            <TabPanel value="ontario">
              <DashBoardON acON={acON} deathsON={deathsON} />
            </TabPanel>
          </TabContext>
        </Box>
        <Outlet />
      </ThemeProvider>
    </div>
  );
};

export default Portfolio;
