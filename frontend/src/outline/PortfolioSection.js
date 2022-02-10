import { Container } from "@mui/material";
import React from "react";
import { Col, Row } from "react-bootstrap";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useNavigate } from 'react-router-dom'


function PortfolioSection() {

    const navigate = useNavigate();

  return (
    <Container>
      <Row>
        <Col>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="https://adventures.com/media/19780/s-sunrise-sunset-ottawa-city-canada-buildings-architecture.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Ontario
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/portfolio/ontario')}>Learn More</Button>
            </CardActions>
          </Card>
        </Col>
        <Col>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="https://geology.com/world/world-map.gif"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                The world
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PortfolioSection;
