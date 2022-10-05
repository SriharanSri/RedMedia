import React from "react";
import Header2 from "../header2";

import "./style.scss";

const DashboardWrapper = ({ children }) => {
  return (
    <>
      <Header2 />
      <section>
        <div className="section_wrapper">
          {/* <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12"> */}
          {children}
          {/* </div>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default DashboardWrapper;
