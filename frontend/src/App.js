import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import authServices from "./store/services/authServices";
import NavPage from "./outline/NavPage";
import "./app.css";

import Home from "./outline/Home";
import DashBoardON from "./porfolio/ontario/DashBoardON";
import {
  GetPosts,
  EpiDemographyON,
  EpiGraphON,
  EpiMapON
} from "./data/DataSourcesON";
import Test from "./porfolio/ontario/Test";

function App() {
  console.log(authServices());
  console.log(GetPosts());
  // const posts = GetPosts();


  const graphData = {
    'epi': EpiGraphON(),
    'demograph': EpiDemographyON()
  }

  const mapData = EpiMapON()

  const homeSec = { siteSec: "block", portfolioSec: "block", postSec: "none" };
  const portfolioSec = {
    siteSec: "none",
    portfolioSec: "block",
    postSec: "none",
  };
  const postSec = { siteSec: "none", portfolioSec: "none", postSec: "block" };

  return (
    <BrowserRouter>
      <NavPage />
      <Test/>

      <Routes>
        <Route path="" element={<Home display={homeSec} />} />
        <Route path="home" element={<Home display={homeSec} />} />
        <Route path="portfolio" element={<Home display={portfolioSec} />} />
        <Route
          path="portfolio/ontario"
          element={<DashBoardON mapData={mapData} graphData={graphData} />}
        />
        <Route path="/posts" element={<Home display={postSec} />} />
        <Route path='test' element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
