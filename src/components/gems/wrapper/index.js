import React from "react";
import Header2 from "../../header2";
import ArtworkScroll from "../artwork-scroll";
import Footer from "../footer";

import "./style.scss";

const Wrapper = ({ children }) => {
  // const dispatch
  return (
    <>
      <Header2 />
      <div className="gems-wrapper">
        <div className="bl_signup_wrapper">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="flex-block">
                  <ArtworkScroll />

                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wrapper;
