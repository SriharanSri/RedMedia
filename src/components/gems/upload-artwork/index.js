/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useHistory, useRouteMatch } from "react-router";
import { FaRegTimesCircle } from "react-icons/fa";

import Wrapper from "../wrapper";
import InputText from "../../input-text";
import { uploadArtworkApi, trackIP } from "../../../api/methods";
import {
  detectWhatsapp,
  invokeGoogleEvent,
  validateName,
  validateNameReplace,
} from "../../../utils/common";

import "./style.scss";
import { useQuery } from "../../../hooks/url-params";
import { AiFillHeart } from "react-icons/ai";
// import { useQuery } from "../hooks/url-params";

const UploadArtwork = ({ show_success = false }) => {
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("in");
  const imageTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [file, setFile] = useState(null);
  const [artwork, setArtwork] = useState({
    artist_name: "",
    name: "",
    artist_age: "",
    image: "",
  });
  const [uploadedArtwork, setUploadedArtwork] = useState({});
  const [shareUrl, setShareUrl] = useState("");
  const [totalArt, setTotalArt] = useState("");
  const [validation, setValidation] = useState({
    artist_name: false,
    name: false,
    artist_age: false,
    image: false,
  });

  useEffect(() => {
    getLocationDetails();
  }, []);

  // useEffect(() => {
  //   const coupon = query.get("promocode") ? query.get("promocode") : "";
  //   if (coupon) {
  //     setChecked(true);
  //     setArtwork({
  //       ...artwork,
  //       coupon: coupon,
  //     });
  //   }
  // }, []);

  const getLocationDetails = async () => {
    try {
      const result = await trackIP();

      const ip_code = result.data?.country_code;

      if (ip_code) {
        setCountry(ip_code.toLowerCase());
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js ~ line 70 ~ getLocationDetails ~ error",
        error
      );
    }
  };

  const handleChangeEvent = (e) => {
    if (e.target.value) {
      if (e.target.name === "artist_name" || e.target.name === "name") {
        if (validateName(e.target.value)) {
          setArtwork({
            ...artwork,
            [e.target.name]: validateNameReplace(e.target.value),
          });
          setValidation({ ...validation, [e.target.name]: false });
        }
      } else if (e.target.name === "artist_age") {
        setArtwork({
          ...artwork,
          [e.target.name]:
            e.target.value > 0 && e.target.value < 101 ? e.target.value : "",
        });
        setValidation({ ...validation, [e.target.name]: false });
      } else if (e.target.name === "image") {
        for (let file of e.target.files) {
          const reader = new FileReader();

          reader.onload = () => {
            if (imageTypes.includes(file.type)) {
              setFile(file);
            } else {
              setValidation({ ...validation, [e.target.name]: true });
              toast.error("Please select an image file");
              setArtwork({
                ...artwork,
                [e.target.name]: "",
              });
            }
          };
          reader.readAsDataURL(file);
        }
        setArtwork({
          ...artwork,
          [e.target.name]: e.target.value,
        });
        setValidation({ ...validation, [e.target.name]: false });
      } else {
        setArtwork({
          ...artwork,
          [e.target.name]: e.target.value,
        });
        setValidation({ ...validation, [e.target.name]: false });
      }
    } else {
      setArtwork({ ...artwork, [e.target.name]: e.target.value });
      setValidation({ ...validation, [e.target.name]: true });
    }
  };

  const checkValidation = () => {
    let c_validation = { ...validation };
    if (!artwork.artist_name) {
      c_validation = { ...c_validation, artist_name: true };
    }

    if (!artwork.name) {
      c_validation = { ...c_validation, name: true };
    }
    if (!artwork.artist_age) {
      c_validation = { ...c_validation, artist_age: true };
    }
    if (!artwork.image) {
      c_validation = { ...c_validation, image: true };
    }

    setValidation(c_validation);
    if (
      !c_validation.artist_name &&
      !c_validation.name &&
      !c_validation.artist_age &&
      !c_validation.image
    ) {
      return true;
    } else {
      return false;
    }
  };

  const prefixZeros = (totalArtworks) => {
    if (!totalArtworks) return;

    let text = "";
    for (let i = 0; i < 5 - totalArtworks.length; i++) {
      text += "0";
    }
    setTotalArt(text.concat(totalArtworks));
  };

  const handleUpload = async () => {
    // if (window.fbq && typeof window.fbq === "function")
    //   window.fbq("trackCustom", "GemsNFT_SubmitArtwork");
    if (checkValidation()) {
      try {
        invokeGoogleEvent("upload_art_submit", {
          eventAction: "form submit",
          eventLabel: "success",
        });
        setLoading(true);
        var formData = new FormData();
        const randomString = () =>
          (Math.random() + 1).toString(36).substring(7);
        const imageFile = new File([file], randomString(), {
          type: file.type,
        });
        formData.append("artwork[artist_age]", artwork.artist_age);
        formData.append("artwork[name]", artwork.name);
        formData.append("artwork[artist_name]", artwork.artist_name);
        formData.append("artwork[image]", imageFile);

        const result = await uploadArtworkApi(formData);
        if (result.status === 201 || result.status === 200) {
          if (result?.data?.data?.artwork?.image_url) {
            setRegisterSuccess(true);
            setUploadedArtwork(result?.data?.data);
            setShareUrl(
              `${process.env.REACT_APP_WEBSITE_URL}/art/${result?.data?.data?.artwork?.slug}`
            );
          } else
            throw new Error(
              "Image upload failure, CDN link not found in the response"
            );
          prefixZeros(result?.data?.data?.total_artworks.toString());
        }
      } catch (err) {
        console.log("🚀 ~ handleUpload ~ err", err);
      } finally {
        setLoading(false);
      }
    } else
      invokeGoogleEvent("upload_art_submit", {
        eventAction: "form submit error",
        eventLabel: "empty fields",
      });
  };

  const handleKeyPressEvent = (event) => {
    if (event.key === "Enter") {
      handleUpload();
    }
  };

  const RegisterLogics = () => {
    return (
      <>
        {registerSuccess ? (
          <div className="bl_form_box gem-decor">
            <div className="form-cntnt-box">
              <h4 className="fs-1 w-100 text-center cd_blue">Thank You!!!</h4>
              <div className="artwork-items">
                <div className="artwork-card">
                  {uploadedArtwork?.artwork?.image_url && (
                    <img
                      src={uploadedArtwork?.artwork?.image_url}
                      className="artwork-image"
                    />
                  )}
                  <h5 className="artwork-name">
                    {" "}
                    <AiFillHeart className="heart-icon liked" />
                    <span>{uploadedArtwork?.artwork?.name}</span>
                  </h5>
                </div>
              </div>

              <div className="share-box">
                <h5>share this on social media</h5>
                <ul className="popup-share-links">
                  <li>
                    <a
                      className="fb"
                      target="_blank"
                      // onClick={() =>
                      //   window.open(
                      //     `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}}%26quote=${encodeURIComponent(
                      //       "My child just created an NFT with Cadbury Gems Junior NFT! The sale of the NFT will contribute to supporting the education of under-privileged children. To see this NFT, pre-book an NFT or create your own visit www.cadburygems.in"
                      //     )}`
                      //   )
                      // }
                      onClick={() => {
                        invokeGoogleEvent("upload_art_share", {
                          eventLabel: "facebook",
                        });
                        window.open(
                          `https://www.facebook.com/dialog/feed?app_id=${process.env.REACT_APP_FACEBOOK_CLIENT_ID}&display=page&caption=My child just created an NFT with Cadbury Gems Junior NFT! The sale of the NFT will contribute to supporting the education of under-privileged children. To see this NFT, pre-book an NFT or create your own visit www.cadburygems.in&link=${shareUrl}&redirect_uri=${process.env.REACT_APP_WEBSITE_URL}`
                        );
                      }}
                    ></a>
                  </li>
                  <li>
                    <a
                      className="twitter"
                      target="_blank"
                      onClick={() => {
                        invokeGoogleEvent("upload_art_share", {
                          eventLabel: "twitter",
                        });
                        window.open(
                          `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
                            `My child just created an NFT with Cadbury Gems Junior NFT! The sale of the NFT will contribute to supporting the education of under-privileged children. To see this NFT, pre-book an NFT or create your own visit www.cadburygems.in\n`
                          )}`
                        );
                      }}
                    ></a>
                  </li>
                  <li>
                    <a
                      className="whatsapp"
                      target="_blank"
                      onClick={() => {
                        detectWhatsapp(
                          `whatsapp://send?text=My child just created an NFT with Cadbury Gems Junior NFT!%0A${shareUrl}%0AThe sale of the NFT will contribute to supporting the education of under-privileged children. To see this NFT, pre-book an NFT or create your own visit www.cadburygems.in`
                        ).then((hasWhatsapp) => {
                          if (!hasWhatsapp) {
                            alert(
                              "You don't have WhatsApp, kindly install it and try again"
                            );
                          } else
                            invokeGoogleEvent("upload_art_share", {
                              eventLabel: "whatsapp",
                            });
                        });
                      }}
                    ></a>
                  </li>
                </ul>
              </div>
              <div className="number-count-box">
                <h5>Number of entries so far</h5>
                <div className="artwork-count">
                  <span className="count-pill letter-spacing">{totalArt}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bl_form_box gem-decor">
            <div className="form-cntnt-box">
              <h3 class="bl_form_heading">
                Upload your Art{" "}
                <a href="/" className="artcard-close-btn">
                  <FaRegTimesCircle />
                </a>
              </h3>
              <div className="form-group mb-3">
                <InputText
                  title={"Name of the child artist"}
                  name="artist_name"
                  value={artwork.artist_name}
                  // required={validation.artist_name}
                  onKeyPress={handleKeyPressEvent}
                  onChange={handleChangeEvent}
                  placeholder="Name"
                />
                {validation.artist_name && (
                  <p className="error_text">Please enter a valid name</p>
                )}
              </div>
              <div className="form-group mb-3">
                <InputText
                  title={"Age of the child artist"}
                  name="artist_age"
                  type="text"
                  pattern="[0-9]*"
                  value={artwork.artist_age}
                  // required={validation.artist_age}
                  onKeyPress={handleKeyPressEvent}
                  onChange={handleChangeEvent}
                  placeholder="Age"
                />
                {validation.artist_age && (
                  <p className="error_text">Please enter a valid age</p>
                )}
              </div>
              <div className="form-group mb-3">
                <InputText
                  title={"Name of the art"}
                  name="name"
                  // required={validation.name}
                  value={artwork.name}
                  onKeyPress={handleKeyPressEvent}
                  onChange={handleChangeEvent}
                  placeholder="Name of the art"
                />
                {validation.name && (
                  <p className="error_text">Please enter a valid name</p>
                )}
              </div>

              <div className="form-group mb-3">
                <InputText
                  title={"Upload your art (max 30MB. Use .jpg, .png, .gif)"}
                  name="image"
                  type="file"
                  accept=".png, .jpg, .jpeg .gif"
                  // required={validation.image}
                  value={artwork.image}
                  onKeyPress={handleKeyPressEvent}
                  onChange={handleChangeEvent}
                  placeholder="Upload your art here"
                />
                {validation.image && (
                  <p className="error_text">Please upload an image</p>
                )}
              </div>

              <div className="form-group btnor-group mb-2">
                <button
                  disabled={loading}
                  type="button"
                  className="bl_btn"
                  onClick={handleUpload}
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <Wrapper>{RegisterLogics()}</Wrapper>
    </>
  );
};

export default UploadArtwork;
