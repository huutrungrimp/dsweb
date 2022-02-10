import React from "react";
import Typography from "@mui/material/Typography";
import { Container } from "react-bootstrap";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";

const MyProfile = () => {
  return (
    <Container style={{ marginTop: "70px" }}>
      <Typography
        align="center"
        sx={{
          wordWrap: "break-word",
          marginTop: "50px",
          fontWeight: "bold",
          fontSize: {
            lg: 50,
            md: 40,
            sm: 30,
            xs: 20,
          },
        }}
      >
        Data Analyst | Web Developer
      </Typography>

      <div style={{ "textAlign": "center" }}>
        <AutoGraphIcon
          sx={{
            fontSize: {
              lg: 100,
              md: 80,
              sm: 60,
              xs: 40,
            },
          }}
        />
        <FollowTheSignsIcon
          sx={{
            color: "green",
            fontSize: {
              lg: 100,
              md: 80,
              sm: 60,
              xs: 40,
            },
          }}
        />
      </div>

      <div style={{ margin: "auto", width: "75%", "textAlign": "center" }}>
        <Typography
          align="center"
          sx={{
            wordWrap: "break-word",
            marginTop: "50px",
            fontSize: {
              lg: 40,
              md: 30,
              sm: 20,
              xs: 15,
            },
          }}
        >
          Data Collection, Data Cleansing, Statistical Analysis and
          Visualization, Full-Stack Web Development
        </Typography>
      </div>
    </Container>
  );
};

export default MyProfile;
