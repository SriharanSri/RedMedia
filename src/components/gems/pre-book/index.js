import NftBookingCard from "../NftBookingCard";
import NftBokingImage from "../../../images/gems/hero-pg-logo.svg";
import "./style.scss";
import { getShortListedArtwork } from "../../../api/methods";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  Redirect,
} from "react-router-dom";
import { getCookies } from "../../../utils/cookies";
const PreBook = () => {
  const [artworkByUin, setArtworkByUin] = useState({});
  const user = useSelector((state) => state.user);
  const handleFetchArtworkByUin = async (uin) => {
    try {
      const response = await getShortListedArtwork({ uin });
      console.log(response?.data?.data);
      if (response?.data?.status === 200) {
        setArtworkByUin(response?.data?.data?.artwork);
      }
    } catch (e) {
      setArtworkByUin({});
      if (e?.data?.status === 404) {
        toast.warn(e?.data?.data?.message || "Artwork is not shortlisted");
      }
    }
  };

  return (

    user.login && getCookies() ? (
      <div className="d-flex gap-5 pre-book-block">
        <NftBookingCard
          title="PRE-BOOK"
          imgSrc={NftBokingImage}
          data={{}}
          type="counter"
        />
        <NftBookingCard
          title="PRE-BOOK WITH UIN"
          imgSrc={NftBokingImage}
          data={artworkByUin}
          fetchData={handleFetchArtworkByUin}
          type="preview"
        />
      </div>
    ) : (
      <Redirect
        to={{ pathname: "/signin/upload" }}
      />
    )
  );
};

export default PreBook;
