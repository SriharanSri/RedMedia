import React, { useState } from "react";
import { FaEye, FaMobileAlt, FaRegEnvelope, FaUserEdit } from "react-icons/fa";
import userImg from "../../../images/user_1.png";
import EditProfileModal from "../edit-profile-modal";
import ChangePasswordModal from "../change-password";
import { useSelector } from "react-redux";
import "./style.scss";
import { invokeGoogleEvent } from "../../../utils/common";

const UserProfileCard = () => {
  const { user } = useSelector((state) => state);
  const [showEditProfileModel, setShowEditProfileModel] = useState(false);
  const [showChangePasswordModel, setShowChangePasswordModel] = useState(false);

  return (
    <>
      <article className="profile-block">
        <div className="user-profile-image-block">
          <img
            className="user-image"
            src={
              user?.data?.user?.avatar_url
                ? user?.data?.user?.avatar_url
                : userImg
            }
            alt="user-icon"
          />
        </div>
        <div className="user-profile-info-block">
          <div className="header-box">
            <h3>{user?.data?.user?.private_name}</h3>
            <span
              className="editweb"
              onClick={() => {
                setShowEditProfileModel(true);
              }}
            >
              <FaUserEdit /> Edit
            </span>
          </div>
          <div className="info-box">
            <ul className="info-list">
              <li>
                <FaRegEnvelope /> <span>{user?.data?.user?.email}</span>
              </li>
              <li>
                <FaMobileAlt /> <span>+{user?.data?.user?.phone_no}</span>
              </li>
              <li className="change-password">
                <span
                  onClick={() => {
                    invokeGoogleEvent("profile_edit", {
                      eventAction: "change password",
                    });
                    setShowChangePasswordModel(true);
                  }}
                >
                  <FaEye />
                  Change password
                </span>
              </li>
            </ul>
          </div>

          <span
            className="editmobile"
            onClick={() => setShowEditProfileModel(true)}
          >
            <FaUserEdit /> Edit
          </span>
        </div>
      </article>
      {showEditProfileModel && (
        <EditProfileModal
          show={showEditProfileModel}
          onHideClose={() => setShowEditProfileModel(false)}
        />
      )}
      {showChangePasswordModel && (
        <ChangePasswordModal
          show={showChangePasswordModel}
          onHide={() => setShowChangePasswordModel(false)}
        />
      )}
    </>
  );
};

export default UserProfileCard;
