import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPreOrderedArtworks, getShortlistedArt } from "../../../api/methods";
import NftCard from "../nft-card";
import PreBookedNftCard from "../pre-booked-nft-card";
import MyNftCard from "../my-nft-card";
// import { getShortlistedArt } from "../../../api/methods"; 

import "./style.scss";

const UserArtworkNFT = () => {
  const [artworks, setArtworks] = useState([]);
  const [preOrders, setPreOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalArtworks, setTotalArtworks] = useState(0);
  const [totalPreOrders, setTotalPreOrders] = useState(0);
  const { boughtNfts = [] } = useSelector((state) => state.drop);

  const handleGetUserArtworks = async () => {
    let [userArtworks, preOrderedArtworks] = await Promise.all([
      getShortlistedArt(),
      getPreOrderedArtworks('paid'),
    ]);
    console.log(userArtworks?.data?.data)
    if (userArtworks?.data?.success) {
      setArtworks(userArtworks?.data?.data?.artworks);
      setTotalArtworks(userArtworks?.data?.data?.total);
      setPreOrders(preOrderedArtworks?.data?.data?.orders);
      setTotalPreOrders(
        calculateTotalPrebookedOrders(preOrderedArtworks?.data?.data?.orders)
      );
    }
  };

  const calculateTotalPrebookedOrders = (orders = []) => {
    return orders.reduce((total, order) => total + order.quantity, 0);
  };

  // const shortlistedart = artworks.filter((obj) => obj.shortlisted === true);
  // const totalArtworks = shortlistedart.length
  // // setTotalArtworks(shortlistedart.length)
  // const handleModalOpen = () => {
  //   // setShowClaimModel(true);
  //   // setTimeout(() => setDisplayNft(true), 0);
  //   // setTimeout(() => setShakeNft(true), 6500);
  // };
  useEffect(() => {
    handleGetUserArtworks();
  }, []);

  return (
    <section className="userartwork-nfts">
      <h4 className="sec-heading">Shortlisted Art ({totalArtworks})</h4>
      <ul className="userartwork-list">
        {artworks.length > 0 &&
          artworks.map((art) => {
            return (
              <li key={art?.slug}>
                <NftCard {...art} />
              </li>
            );
          })}
      </ul>
      <h4 className="sec-heading">My Pre-booked NFTs ({totalPreOrders})</h4>
      <ul className="userartwork-list">
        {preOrders.length > 0 &&
          preOrders.map((art) => {
            return (
              <li key={art?.slug}>
                <PreBookedNftCard {...art} />
              </li>
            );
          })}
      </ul>
      {
        // boughtNfts.length > 0 && 
        // (
        //   <>
        //     <div className="reveal">
        //       <h4 className="sec-heading">My NFTs ({boughtNfts.length})</h4>
        //       <button
        //         className="reveal-btn"
        //       // onClick={handleModalOpen}
        //       >
        //         {/* {loading ? "Processing ..." : "BUY NOW"} */}
        //         Reveal All
        //       </button>
        //     </div>
        //     <ul className="userartwork-list">
        //       {boughtNfts.map((art, i) => {
        //         return (
        //           <li key={i}>
        //             <MyNftCard {...art} index={i} />
        //           </li>
        //         );
        //       })}
        //     </ul>
        //   </>
        // )
      }
    </section>
  );
};

export default UserArtworkNFT;
