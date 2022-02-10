import * as React from "react";
import { Row, Col, Tab, Nav } from "react-bootstrap";
import DashBoardON from "./ontario/DashBoardON";

const PortfolioDB = ({ acON, deathsON }) => {
  console.log(acON, deathsON);
  return (
    <div style={{ marginTop: "70px", backgroundColor: "#c0c0c0", paddingTop:'20px' }}>
      <Tab.Container defaultActiveKey="ontario">
        <Row style={{fontFamily:'Arial', fontSize:'20px'}}>
          <Col sm={2} md={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="ontario">Ontario</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="world">The World</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10} md={10}>
            <Tab.Content>
              <Tab.Pane eventKey="ontario">
                <DashBoardON acON={acON} deathsON={deathsON} />                
              </Tab.Pane>
              <Tab.Pane eventKey="world">
                <DashBoardON acON={acON} deathsON={deathsON}/>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default PortfolioDB;
