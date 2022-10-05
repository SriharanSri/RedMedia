import React from "react";
import WrapperSingle from "../components/gems/wrapper-single";
import NotFoundComponent from "../components/not-found"
const NotFound = () => {
  return (
    <>
    <WrapperSingle displayHeader={false} displayFooter={false}>
      <NotFoundComponent/>
    </WrapperSingle>
    </>
  );
};

export default NotFound;
