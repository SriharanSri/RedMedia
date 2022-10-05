import React from "react";
import { useRouteMatch } from "react-router";

import UserProfile from "../components/gems/accounts/user-profile";
import Wrapper from "../components/gems/wrapper-single";

const Accounts = () => {
  const match = useRouteMatch();
  const { page } = match.params;
  const currentPage = page ? page : "profile";

  return <Wrapper>{currentPage === "profile" && <UserProfile />}</Wrapper>;
};

export default Accounts;
