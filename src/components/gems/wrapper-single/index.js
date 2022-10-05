import React from "react";
import Header2 from "../../header2";
import Footer from "../footer";

import "./style.scss";

const WrapperSingle = ({ displayHeader = true, displayFooter = true, children }) => {
  return (
    <>
      {displayHeader && <Header2 />}
      <div className="gems-wrapper">{children}</div>
      {displayFooter && <Footer />}
    </>
  );
};

export default WrapperSingle;
