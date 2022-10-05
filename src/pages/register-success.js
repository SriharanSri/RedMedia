import React from "react";
import { Helmet } from "react-helmet";

import Header2 from "./../components/header2";
import RegisterComponent from "./../components/register";

const RegisterSuccess = () => {
  return (
    <>
      <Helmet>
        <title>Cadbury Gems Junior NFT - Sign Up</title>
        <meta
          name="description"
          content="Are you a first-time visitor? Sign-up with Jump.trade and become a part of the NFT revolution in the sub-continent."
        />
        <meta property="og:title" content="Cadbury Gems Junior NFT - Sign Up" />
        <meta
          property="og:description"
          content="Are you a first-time visitor? Sign-up with Jump.trade and become a part of the NFT revolution in the sub-continent."
        />
        <meta
          name="twitter:title"
          content="Cadbury Gems Junior NFT - Sign Up"
        />
        <meta
          name="twitter:description"
          content="Are you a first-time visitor? Sign-up with Jump.trade and become a part of the NFT revolution in the sub-continent."
        />
        <script
          src={`https://pixel.whistle.mobi/track_pixel.js?v=${Date.now()}`}
          type="text/javascript"
        />
      </Helmet>
      <Header2 />
      <RegisterComponent show_success={true} />
    </>
  );
};

export default RegisterSuccess;
