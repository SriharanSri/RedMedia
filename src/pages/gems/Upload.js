import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router";

import Header2 from "../../components/header2";
import UploadArtwork from "../../components/gems/upload-artwork";
import { useQuery } from "../../hooks/url-params";
import { setCookiesByName } from "../../utils/cookies";

const Upload = () => {
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
          src={`https://pixel.whistle.mobi/initialize_pixel.js?v=${Date.now()}`}
          type="text/javascript"
        />
      </Helmet>
      <Header2 />
      <UploadArtwork />
    </>
  );
};

export default Upload;
