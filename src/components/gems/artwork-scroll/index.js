import { AiFillHeart } from "react-icons/ai";
import useWindowSize from "../../../hooks/useWindowSize";

// import artwork1 from "../../../images/gems/artwork/Butterfly.jpg";
// import artwork2 from "../../../images/gems/artwork/Clown.jpg";
// import artwork3 from "../../../images/gems/artwork/Elephant.jpg";
// import artwork4 from "../../../images/gems/artwork/MyHome.jpg";
// import artwork5 from "../../../images/gems/artwork/Dinosaur.jpg";
// import artwork6 from "../../../images/gems/artwork/Landscape.jpg";
import artwork1 from "../../../images/gems/artwork/butterflyN.jpg";
import artwork2 from "../../../images/gems/artwork/horseN.jpg";
import artwork3 from "../../../images/gems/artwork/fishN.jpg";
import artwork4 from "../../../images/gems/artwork/My-Home.jpg";
import artwork5 from "../../../images/gems/artwork/dragonN.jpg";
import artwork6 from "../../../images/gems/artwork/spaceN.jpg";

import gemblue from "../../../images/gems/gems-icons/blue.svg";
import gembrown from "../../../images/gems/gems-icons/brown.svg";
import gemgreen from "../../../images/gems/gems-icons/green.svg";
import gemorange from "../../../images/gems/gems-icons/orange.svg";
import gempink from "../../../images/gems/gems-icons/pink.svg";
import gemred from "../../../images/gems/gems-icons/red.svg";
import gemyellow from "../../../images/gems/gems-icons/yellow.svg";

import "./style.scss";
const ArtworkScroll = () => {
  const size = useWindowSize();
  return (
    <>
      <div className="scroller-block">
        <h2 className="picks">Picks of the Week</h2>
        <article className="artwork-scroll">
          <img src={gemblue} className="gem-icon gem1" />
          <img src={gembrown} className="gem-icon gem2" />
          <img src={gemgreen} className="gem-icon gem3" />
          <img src={gemorange} className="gem-icon gem4" />
          <img src={gempink} className="gem-icon gem5" />
          <img src={gemred} className="gem-icon gem6" />
          <img src={gemyellow} className="gem-icon gem7" />
          <ul className="artwork-list">
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork1} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon liked" />
                  <span>Butterfly</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork3} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon liked" />
                  <span>Fish</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork4} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon" />
                  <span>My Home</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork5} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon liked" />
                  <span>Dragon</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork6} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon liked" />
                  <span>Space</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork2} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon" />
                  <span>Horse</span>
                </h5>
              </div>
            </li>
            {/* Extra */}
            {/* <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork001} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon liked" />
                  <span>leith casel</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork007} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon" />
                  <span>Heith Bay</span>
                </h5>
              </div>
            </li> 
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork003} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon liked" />
                  <span>larry klis</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork004} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon" />
                  <span>serge posy</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork005} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon liked" />
                  <span>Monica</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork006} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon liked" />
                  <span>Rob bane</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork001} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon liked" />
                  <span>leith casel</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork007} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon" />
                  <span>Heith Bay</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork003} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon liked" />
                  <span>larry klis</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork004} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon" />
                  <span>serge posy</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork005} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon liked" />
                  <span>Monica</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork006} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon liked" />
                  <span>Rob bane</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork001} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon liked" />
                  <span>leith casel</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork007} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon" />
                  <span>Heith Bay</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork003} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon liked" />
                  <span>larry klis</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork004} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon" />
                  <span>serge posy</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork005} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon liked" />
                  <span>Monica</span>
                </h5>
              </div>
            </li>
            <li className="artwork-items">
              <div className="artwork-card">
                <img src={artwork006} className="artwork-image" />
                <h5 className="artwork-name">
                  {" "}
                  <AiFillHeart className="heart-icon liked" />
                  <span>Rob bane</span>
                </h5>
              </div>
            </li> */}
          </ul>
        </article>
      </div>
    </>
  );
};

export default ArtworkScroll;
