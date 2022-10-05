import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import "./style.scss";

const ToolTip = ({ icon, placement, content, temp = false }) => {
  return (
    <>
      {temp ? (
        <span>{icon}</span>
      ) : (
        <OverlayTrigger
          key={placement}
          placement={placement}
          overlay={<Tooltip className="tooltip-text">{content}</Tooltip>}
        >
          <span>{icon}</span>
        </OverlayTrigger>
      )}
    </>
  );
};

export default ToolTip;
