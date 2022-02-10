import React from "react";
import { Row, Col } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import CopyrightIcon from "@mui/icons-material/Copyright";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <div
      style={{
        position:'fixed',
        backgroundColor: "#2f3826",
        height: "100px",
        color: "white",
        padding: "10px",
        bottom: "0",
        width: "100%"
      }}
    >
      <Row>
        <Col>
          <Typography variant="h7" sx={{ lineHeight: 2 }}>
            Contact Info
          </Typography>
          <Typography
            sx={{
              fontSize: {
                lg: 18,
                md: 16,
                sm: 12,
                xs: 10,
              },
            }}
          >
            Phone: +1 613-262-0844
          </Typography>
          <Typography
            sx={{
              fontSize: {
                lg: 18,
                md: 16,
                sm: 12,
                xs: 10,
              },
            }}
          >
            E-mail:{" "}
            <span style={{ color: "#498bd1", "textDecoration": "underline" }}>
              huutrungrimp@gmail.com
            </span>
          </Typography>
        </Col>
        <Col>
          <Typography variant="h7" sx={{ lineHeight: 2 }}>
            Follow me
          </Typography>{" "}
          <br />
          <LinkedInIcon />
          <FacebookIcon />
        </Col>
        <Col>
          <Typography
            variant="h7"
            sx={{
              fontSize: {
                lg: 18,
                md: 16,
                sm: 12,
                xs: 10,
              },
            }}
          >
            {" "}
            <CopyrightIcon />
            Trung Nguyen 2022
          </Typography>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
