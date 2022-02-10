import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import authServices from "./store/services/authServices";
import NavPage from "./outline/NavPage";
import "./app.css";

import Home from "./outline/Home";
import Footer from "./outline/Footer";
import PostList from "./posts/PostList"

import PostDetail from "./posts/PostDetail";
import MyPortfolio from "./porfolio/PortfolioDB";
import DashBoardON from "./porfolio/ontario/DashBoardON";
import {
  GetPosts,
  ActiveMapDataON,
  DeathMapDataON,
  EpiGraphDataON,
} from "./data/DataSourcesON";
import Loading from "./outline/Loading";
import WorldDashBoard from "./porfolio/world/WorldDashBoard";
import ActiveCases from "./porfolio/ontario/ActiveCases";
import Deaths from "./porfolio/ontario/Deaths";
import Posts from "./posts/Posts";


function App() {
  console.log(authServices());
  console.log(GetPosts());
  const posts = GetPosts();

  
  const activeON = ActiveMapDataON();
  const deathsON = DeathMapDataON();

  const homeSec = {siteSec:'block', portfolioSec:'block', postSec:'none'}
  const portfolioSec = {siteSec:'none', portfolioSec:'block', postSec:'none'}
  const postSec = {siteSec:'none', portfolioSec:'none', postSec:'block'}

  return (
    <BrowserRouter>
      {Object.keys(activeON).length === 0 ||
      Object.keys(deathsON).length === 0 ||
      Object.keys(posts).length === 0 ? (
        <Loading />
      ) : (
        <div>
          <NavPage />
          <Routes>
            <Route path="" element={<Home display={homeSec} />} />
            <Route path="home" element={<Home display={homeSec} />} />
            <Route path="portfolio" element={<Home display={portfolioSec} />}/>
            <Route path='portfolio/ontario' element={<DashBoardON acON={activeON} deathsON={deathsON} graphON={graphON} />} />
            <Route path="/posts" element={<Home display={postSec} />} />    
                  
          </Routes>          

          {/* <Footer /> */}
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
