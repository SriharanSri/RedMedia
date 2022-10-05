import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router";

import Header2 from "./../components/header2";
import LoginComponent from "./../components/login";
import { useQuery } from "../hooks/url-params";
import { setCookiesByName } from "../utils/cookies";

const Login = () => {
  const location = useLocation();
  const query = useQuery(location.search);

  useEffect(() => {
    const fsz = query.get("fsz");

    if (fsz) {
      setCookiesByName("source", fsz);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Cadbury Gems Junior NFT - Sign In</title>
        <meta
          name="description"
          content="Kickstart your dream NFT  with just a twofold process:  Enter your credentials and Sign in"
        />
        <meta property="og:title" content="Cadbury Gems Junior NFT - Sign In" />
        <meta
          property="og:description"
          content="Kickstart your dream NFT  with just a twofold process:  Enter your credentials and Sign in"
        />
        <meta
          name="twitter:title"
          content="Cadbury Gems Junior NFT - Sign In"
        />
        <meta
          name="twitter:description"
          content="Kickstart your dream NFT  with just a twofold process:  Enter your credentials and Sign in"
        />
      </Helmet>
      <Header2 />
      <LoginComponent />
    </>
  );
};

export default Login;
