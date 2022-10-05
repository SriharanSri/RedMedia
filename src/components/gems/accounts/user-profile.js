import React from "react";
import "./style.scss";
import UserArtworkNFT from "../user-artwork-nfts";
import UserProfileCard from "../user-profile-card";

const UserProfile = () => {
  return (
    <>
      <section className="myprofile-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <UserProfileCard />
              <UserArtworkNFT />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
