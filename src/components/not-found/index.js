import React from "react";
import "./style.scss";
import { Link } from 'react-router-dom';
import HeroLogo from "../../images/gems/hero-pg-logo.svg";

const NotFoundComponent = () => {
  return (
    <>
     <div className="gems-wrapper">
          <div className="container">
            <div
              className="row align-items-center justify-content-center"
              style={{
                minHeight: "calc(100vh)",
              }}
            >
              <center>
                <img src={HeroLogo} className="logo-img" />
                <div className="notfound-text-block">
                  <h1 className="textColor">404</h1>
                  <h4 className="textColor">This page doesn't exist.</h4>
                  <h5 className="textColor">
                    Go to {" "}
                    <Link className="linkColor"to='/'>Home</Link>{" "}
                    Page
                  </h5>
                </div>
              </center>
            </div>
          </div>
        </div>)
    </>
  );
};

export default NotFoundComponent;
