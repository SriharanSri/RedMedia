import React from "react";
import NFTCard from "../nft-card";
import nonftfound from "../../images/nonftfound.svg";

const NFTOwn = ({ nftList, data, putOnSale = false, isLive = false }) => {
  return (
    <>
      {nftList.length > 0 ? (
        <div className="row gutters-20">
          {nftList.map((nft, i) => (
            <NFTCard
              key={`nft-own-${i}`}
              nft={nft}
              data={data}
              putOnSale={putOnSale}
              isLive={isLive}
            />
          ))}
        </div>
      ) : (
        <div className="nonft_found">
          <div className="nodata-card">
            <img src={nonftfound} height="90" alt="" />
            <h4>This Space Is Awaiting Your NFT.</h4>
          </div>
        </div>
      )}
    </>
  );
};

export default NFTOwn;
