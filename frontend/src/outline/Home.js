import MyProfile from '../profiles/MyProfile'
import PortfolioSection from './PortfolioSection';

const Home = ({display}) => {
  console.log(display);
  return (
    <div style={{marginTop: '70px'}}>
      <div style={{display:display.siteSec}}><MyProfile /> </div>
      <div style={{display:display.portfolioSec}}><PortfolioSection /></div>
      <div style={{display:display.postSec}}>My posts</div>
    </div>
  );
};

export default Home;
