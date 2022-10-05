/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  FaCamera,
  FaCheck,
  FaImage,
  FaTimes,
  FaTrash,
  FaUserCheck,
  FaCheckCircle,
  FaUserLock,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import ToggleButton from "react-toggle-button";
import { MdEdit } from "react-icons/md";
import {
  Dropdown,
  Modal,
  Alert,
  ButtonGroup,
  ToggleButton as CustomToggle,
} from "react-bootstrap";
import { useLocation } from "react-router";
import Select from "react-select";

import InputTextArea from "../input-textarea";
import userImg from "../../images/user_1.png";
import faImg from "../../images/facebook-1@2x.jpg";
import inImg from "../../images/instagram-1@2x.jpg";
import teImg from "../../images/telegram@2x.jpg";
import twImg from "../../images/twitter@2x.jpg";
import ToolTip from "../tooltip";
import InputText from "../input-text";
import NFTOwn from "../nft-own";
import InputPhone from "../input-phone";
import NFTFav from "../nft-fav";
import {
  BiCaretDown,
  BiCheck,
  BiLoaderAlt,
  BiSearch,
  BiX,
} from "react-icons/bi";
import {
  crispStyle,
  validateGSTIN,
  validateName,
  validateNameReplace,
  validateNumber,
  validatePAN,
  validateURL,
  validInternationalPhone,
} from "../../utils/common";

import {
  kycApi,
  profileUpdateApi,
  removeImage,
  privateNFTApi,
  kycExistingUserApi,
  getUserKycDetails,
} from "../../api/methods";

import {
  userFavNFTsApi as userFavMarketplace,
  userOwnedNFTsApi as userOwnedMarketplace,
} from "../../api/methods-marketplace";
import countries from "../../utils/countries.json";

import { updateBanner } from "../../api/methods";
import { updateAvatar } from "./../../api/methods";
import { toast } from "react-toastify";
import { user_load_by_token_thunk } from "../../redux/thunk/user_thunk";
import { getCookies } from "../../utils/cookies";
import {
  getTotalOwn,
  userFavNFTsApi,
  userOwnedNFTsApi,
} from "../../api/methods-nft";
import NFTOnsale from "../nft-onsale";

const UserProfile = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const { page } = useParams();
  const mynft = useRef(null);
  const myProfile = useRef(null);
  const mynft_scroll = () => mynft.current.scrollIntoView();
  const myprofile_scroll = () => myProfile.current.scrollIntoView();
  const state = useSelector((state) => state.user);
  const { user } = state.data;
  const [bgLoading, setBgLoading] = useState(false);
  const [nftListLoading, setNftListLoading] = useState(false);
  const [nftListLoadingDrop, setNftListLoadingDrop] = useState(false);
  const [kycLoading, setKycLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [kycModal, setKycModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [onlyAuction, setOnlyAuction] = useState(false);
  const [privateNFT, setPrivateNFT] = useState(
    user?.private_nfts ? user?.private_nfts : false
  );
  const socialLinks = user.social_links;
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    phone_no: "",
    phone_code: "",
    website: "",
    facebook: "",
    instagram: "",
    telegram: "",
    twitter: "",
    private: false,
    private_name: "",
    description: "",
  });
  const [validation, setValidation] = useState({
    first_name: false,
    valid_first_name: false,
    last_name: false,
    valid_last_name: false,
    phone_no: false,
    valid_phone_no: false,
    website: false,
    valid_website: false,
    facebook: false,
    valid_facebook: false,
    instagram: false,
    valid_instagram: false,
    telegram: false,
    valid_telegram: false,
    twitter: false,
    valid_twitter: false,
    private_name: false,
    valid_private_name: false,
    description: false,
  });

  const bgImageRef = useRef(null);
  const avatarImageRef = useRef(null);
  const [bg, setBg] = useState({ file: null, base64: null });
  const [avatar, setAvatar] = useState({ file: null, base64: null });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleRemoveBannerShow = () => setShow(true);

  const [key, setKey] = useState("drops");

  const [ownPage, setOwnPage] = useState(1);
  const [favPage, setFavPage] = useState(1);
  const [onSalePage, setOnSalePage] = useState(1);
  const [ownedNFTs, setOwnedNFTs] = useState({});
  const [ownedNFTCount, setOwnedNFTCount] = useState(0);
  const [ownedNFTsList, setOwnedNFTsList] = useState([]);
  const [favNFTs, setFavNFTs] = useState({});
  const [favNFTsList, setFavNFTsList] = useState([]);
  const [onSaleNFTs, setOnSaleNFTs] = useState({});
  const [onSaleNFTsList, setOnSaleNFTsList] = useState([]);
  const [moreLoading, setMoreLoading] = useState(false);

  const [ownPageDrop, setOwnPageDrop] = useState(1);
  const [favPageDrop, setFavPageDrop] = useState(1);
  const [ownedNFTsDrop, setOwnedNFTsDrop] = useState({});
  const [ownedNFTsListDrop, setOwnedNFTsListDrop] = useState([]);
  const [favNFTsDrop, setFavNFTsDrop] = useState({});
  const [favNFTsListDrop, setFavNFTsListDrop] = useState([]);
  const [moreLoadingDrop, setMoreLoadingDrop] = useState(false);

  const [lootCount, setLootCount] = useState();

  const [dropsType, setDropType] = useState("owned");
  const [marketplaceType, setMarketplaceType] = useState("owned");

  const [filter, setFilter] = useState({
    owned: [
      { name: "All", value: "all", checked: true },
      { name: "Listed on sale", value: "onsale", checked: false },
      { name: "Not on sale", value: "not_on_sale", checked: false },
    ],
  });

  const [ownedSearch, setOwnedSearch] = useState("");
  const [onsaleSearch, setOnsaleSearch] = useState("");

  const [kycDetails, setKycDetails] = useState({
    nationality: "IN",
    user_type: "individual",
    pan: "",
    tan: "",
    gst: "",
    line1: "",
    line2: "",
    country: "IN",
    state: "",
    city: "",
    pincode: "",
    id: "",
    havingGST: "no",
    agree: false,
    gstAgree: false,
    firstName: "",
    lastName: "",
  });

  const [kycValidation, setKycValidation] = useState({
    pan: false,
    tan: false,
    gst: false,
    line1: false,
    line2: false,
    country: false,
    state: false,
    city: false,
    pincode: false,
    firstName: false,
    lastName: false,
    agree: false,
  });

  const [step, setStep] = useState("step1");

  const nationalityRadio = [
    { name: "INDIA", value: "IN" },
    { name: "OTHERS", value: "OTHERS" },
  ];

  const userTypeRadio = [
    { name: "INDIVIDUAL", value: "individual" },
    { name: "BUSINESS", value: "business" },
  ];

  const havingGSTRadio = [
    { name: "Yes", value: "yes" },
    { name: "No", value: "no" },
  ];

  const countriesWithoutIndia = countries.filter(function (x) {
    return x.code2 !== "IN";
  });

  const countriesOnlyIndia = countries.filter(function (x) {
    return x.code2 === "IN";
  });

  const handleKycChangeEvent = (e) => {
    if (e.target.value) {
      if (e.target.name === "pan") {
        if (validatePAN(e.target.value)) {
          setKycDetails({
            ...kycDetails,
            [e.target.name]: e.target.value.toUpperCase(),
          });
          setKycValidation({ ...kycValidation, [e.target.name]: false });
        }
      } else if (e.target.name === "gst") {
        if (validateGSTIN(e.target.value)) {
          setKycDetails({
            ...kycDetails,
            [e.target.name]: e.target.value.toUpperCase(),
          });
          setKycValidation({ ...kycValidation, [e.target.name]: false });
        }
      } else if (e.target.name === "tan") {
        if (validatePAN(e.target.value)) {
          setKycDetails({
            ...kycDetails,
            [e.target.name]: e.target.value.toUpperCase(),
          });
          setKycValidation({ ...kycValidation, [e.target.name]: false });
        }
      } else {
        setKycDetails({ ...kycDetails, [e.target.name]: e.target.value });
        setKycValidation({ ...kycValidation, [e.target.name]: false });
      }
    } else {
      setKycDetails({ ...kycDetails, [e.target.name]: e.target.value });
      setKycValidation({ ...kycValidation, [e.target.name]: true });
    }
  };

  const checkKycValidation = () => {
    let c_validation = { ...kycValidation };

    if (kycDetails.nationality === "IN" && !kycDetails.pan) {
      c_validation = { ...c_validation, pan: true };
    } else {
      c_validation = { ...c_validation, pan: false };
    }

    if (kycDetails.user_type === "business" && !kycDetails.tan) {
      c_validation = { ...c_validation, tan: true };
    } else {
      c_validation = { ...c_validation, tan: false };
    }

    if (!kycDetails.line1) {
      c_validation = { ...c_validation, line1: true };
    } else {
      c_validation = { ...c_validation, line1: false };
    }

    if (!kycDetails.city) {
      c_validation = { ...c_validation, city: true };
    } else {
      c_validation = { ...c_validation, city: false };
    }

    if (!kycDetails.country) {
      c_validation = { ...c_validation, country: true };
    } else {
      c_validation = { ...c_validation, country: false };
    }

    const states =
      kycDetails.country &&
      countries.find((o) => o.code2 === kycDetails.country).states;

    if (!kycDetails.state && states.length > 0) {
      c_validation = { ...c_validation, state: true };
    } else {
      c_validation = { ...c_validation, state: false };
    }

    if (!kycDetails.pincode) {
      c_validation = { ...c_validation, pincode: true };
    } else {
      c_validation = { ...c_validation, pincode: false };
    }

    if (!kycDetails.firstName) {
      c_validation = { ...c_validation, firstName: true };
    } else {
      c_validation = { ...c_validation, firstName: false };
    }

    if (!kycDetails.lastName) {
      c_validation = { ...c_validation, lastName: true };
    } else {
      c_validation = { ...c_validation, lastName: false };
    }

    if (!kycDetails.agree) {
      c_validation = { ...c_validation, agree: true };
    } else {
      c_validation = { ...c_validation, agree: false };
    }

    setKycValidation(c_validation);
    if (
      !c_validation.line1 &&
      !c_validation.pan &&
      !c_validation.tan &&
      !c_validation.city &&
      !c_validation.country &&
      !c_validation.state &&
      !c_validation.pincode &&
      !c_validation.firstName &&
      !c_validation.lastName &&
      !c_validation.agree
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleChangeEvent = (e) => {
    if (e.target.value) {
      if (e.target.name === "first_name" || e.target.name === "last_name") {
        if (validateName(e.target.value)) {
          setProfile({
            ...profile,
            [e.target.name]: validateNameReplace(e.target.value),
          });
          setValidation({ ...validation, [e.target.name]: false });
        }
      } else {
        setProfile({ ...profile, [e.target.name]: e.target.value });
        setValidation({ ...validation, [e.target.name]: false });
      }
    } else {
      setProfile({ ...profile, [e.target.name]: e.target.value });
      setValidation({ ...validation, [e.target.name]: true });
    }
  };

  const checkValidation = () => {
    let c_validation = { ...validation };
    if (!profile.first_name) {
      c_validation = { ...c_validation, first_name: true };
    } else {
      if (validateName(profile.first_name)) {
        c_validation = { ...c_validation, valid_first_name: false };
      } else {
        c_validation = { ...c_validation, valid_first_name: true };
      }
    }

    if (!profile.last_name) {
      c_validation = { ...c_validation, last_name: true };
    } else {
      if (validateName(profile.last_name)) {
        c_validation = { ...c_validation, valid_last_name: false };
      } else {
        c_validation = { ...c_validation, valid_last_name: true };
      }
    }
    if (!profile.phone_no) {
      c_validation = { ...c_validation, phone_no: true };
    } else {
      if (validInternationalPhone(profile.phone_no, profile.phone_code)) {
        c_validation = { ...c_validation, valid_phone_no: false };
      } else {
        c_validation = { ...c_validation, valid_phone_no: true };
      }
    }

    if (profile.website) {
      if (!validateURL(profile.website)) {
        c_validation = { ...c_validation, valid_website: true };
      } else {
        c_validation = { ...c_validation, valid_website: false };
      }
    } else {
      c_validation = { ...c_validation, valid_website: false };
    }

    if (profile.facebook) {
      if (!validateURL(profile.facebook)) {
        c_validation = { ...c_validation, valid_facebook: true };
      } else {
        c_validation = { ...c_validation, valid_facebook: false };
      }
    } else {
      c_validation = { ...c_validation, valid_facebook: false };
    }

    if (profile.instagram) {
      if (!validateURL(profile.instagram)) {
        c_validation = { ...c_validation, valid_instagram: true };
      } else {
        c_validation = { ...c_validation, valid_instagram: false };
      }
    } else {
      c_validation = { ...c_validation, valid_instagram: false };
    }

    if (profile.telegram) {
      if (!validateURL(profile.telegram)) {
        c_validation = { ...c_validation, valid_telegram: true };
      } else {
        c_validation = { ...c_validation, valid_telegram: false };
      }
    } else {
      c_validation = { ...c_validation, valid_telegram: false };
    }

    if (profile.twitter) {
      if (!validateURL(profile.twitter)) {
        c_validation = { ...c_validation, valid_twitter: true };
      } else {
        c_validation = { ...c_validation, valid_twitter: false };
      }
    } else {
      c_validation = { ...c_validation, valid_twitter: false };
    }

    if (profile.private) {
      if (!profile.private_name) {
        c_validation = { ...c_validation, valid_private_name: true };
      } else {
        c_validation = { ...c_validation, valid_private_name: false };
      }
    }

    setValidation(c_validation);
    if (
      !c_validation.first_name &&
      !c_validation.valid_first_name &&
      !c_validation.last_name &&
      !c_validation.valid_last_name &&
      !c_validation.phone_no &&
      !c_validation.valid_phone_no &&
      !c_validation.valid_website &&
      !c_validation.valid_facebook &&
      !c_validation.valid_instagram &&
      !c_validation.valid_telegram &&
      !c_validation.valid_private_name &&
      !c_validation.valid_twitter
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleBlurURL = (e) => {
    let info = e.target.value;
    if (info) {
      if (!(info.startsWith("https://") || info.startsWith("http://"))) {
        info = `https://` + info;
      }

      setProfile({
        ...profile,
        [e.target.name]: info,
      });
    }
  };

  const handleKYC = async () => {
    if (checkKycValidation()) {
      try {
        setKycLoading(true);
        const kyc = {
          nationality:
            kycDetails?.nationality === "IN"
              ? kycDetails?.nationality
              : kycDetails?.country,
          user_type:
            kycDetails?.nationality === "IN" ? kycDetails?.user_type : "",
          pan: kycDetails?.nationality === "IN" ? kycDetails?.pan : "",
          gst: kycDetails?.nationality === "IN" ? kycDetails?.gst : "",
          tan: kycDetails?.nationality === "IN" ? kycDetails?.tan : "",
          address_attributes: {
            first_name: kycDetails?.firstName,
            last_name: kycDetails?.lastName,
            line1: kycDetails?.line1,
            line2: kycDetails?.line2,
            country: kycDetails?.country,
            state: kycDetails?.state,
            city: kycDetails?.city,
            pincode: kycDetails?.pincode,
            id: kycDetails?.id,
          },
        };
        let result;
        if (user.kyc_status === "partially_verified") {
          result = await kycExistingUserApi(
            window.location.href,
            kyc,
            user.slug
          );
        } else {
          result = await kycApi(window.location.href, kyc);
        }

        if (result.data.data.kyc.kyc_status !== "success") {
          if (result.data.data.kyc.verification_url) {
            window.open(result.data.data.kyc.verification_url, "_self");
          } else {
            toast.warn(
              "Unexpected error occured, please try again after sometimes"
            );
          }
        }
        setKycModal(false);
        setKycLoading(false);
      } catch (error) {
        setKycLoading(false);
      }
    }
  };

  const getUserKYCDetails = async () => {
    try {
      setKycLoading(true);
      const result = await getUserKycDetails(user.slug);
      const kyc = result.data.data.kyc;
      if (kyc.kyc_status !== "success") {
        setKycDetails({
          nationality: kyc.nationality === "IN" ? kyc.nationality : "OTHERS",
          user_type: kyc.user_type ? kyc.user_type : "individual",
          pan: kyc.pan,
          havingGST: kyc.gst ? "yes" : "no",
          gst: kyc.gst,
          tan: kyc.tan,
          line1: kyc.address?.line1,
          line2: kyc.address?.line2,
          country: kyc.address?.country,
          state: kyc.address?.state,
          city: kyc.address?.city,
          pincode: kyc.address?.pincode,
          firstName: kyc.address?.first_name,
          lastName: kyc.address?.last_name,
          id: kyc.address?.id,
        });
        setKycModal(true);
      } else {
        const token = getCookies();
        if (token) {
          dispatch(user_load_by_token_thunk(token));
        }
      }
      setKycLoading(false);
    } catch (error) {
      setKycLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (checkValidation()) {
      try {
        setLoading(true);
        let apiInput = { ...profile };
        const updateData = {
          user: {
            first_name: apiInput.first_name,
            last_name: apiInput.last_name,
            private: apiInput.private,
            private_name: apiInput.private_name,
            phone_no: apiInput.phone_no,
            phone_code: apiInput.phone_code,
            user_profile_attributes: {
              desc: apiInput.description,
              website: apiInput.website,
              social_links: {
                facebook: apiInput.facebook,
                instagram: apiInput.instagram,
                telegram: apiInput.telegram,
                twitter: apiInput.twitter,
              },
            },
          },
        };
        const result = await profileUpdateApi({
          slug: user.slug,
          data: updateData,
        });
        if (result.data.success) {
          toast.success("Profile Information Updated Successfully");
          const token = getCookies();
          if (token) {
            dispatch(user_load_by_token_thunk(token));
            setEditModal(false);
          }
        }
      } catch (err) {
        setLoading(false);
        if (err.data.message === "Private name has already been taken")
          toast.warn(
            "Unfortunately, The private name you have chosen is already taken! Please choose a different private name to continue."
          );
        console.log(err);
      }
      setLoading(false);
    }
  };

  const handlePrivateNFT = async (value) => {
    try {
      setLoading(true);
      var formData = new FormData();
      formData.append("user[private_nfts]", value);
      const result = await privateNFTApi({
        data: formData,
      });
      if (result.data.success) {
        // toast.success("Private NFT Success");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
    setLoading(false);
  };

  const handleBannerChange = (input) => {
    for (let file of input.target.files) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBg({ ...bg, base64: event.target.result, file: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarChange = (input) => {
    for (let file of input.target.files) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar({ ...avatar, base64: event.target.result, file: file });
        handleSaveAvatar({
          ...avatar,
          base64: event.target.result,
          file: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  ``;

  const randomString = () => (Math.random() + 1).toString(36).substring(7);
  const handleSaveBanner = async () => {
    try {
      setBgLoading(true);
      var formData = new FormData();

      const myNewFile = new File([bg.file], randomString(), {
        type: bg.file.type,
      });

      formData.append("user[user_profile_attributes][banner]", myNewFile);
      await updateBanner(user.slug, formData);
      toast.success("Banner Image Updated Successfully");
      setBgLoading(false);
      setBg({ file: null, base64: null });
      dispatch(user_load_by_token_thunk(getCookies()));
    } catch (error) {
      setBgLoading(false);
      console.log(
        "🚀 ~ file: user-profile.js ~ line 54 ~ handleSaveBanner ~ error",
        error
      );
    }
  };

  const handleSaveAvatar = async (input) => {
    try {
      setAvatarLoading(true);
      var formData = new FormData();
      formData.append("user[user_profile_attributes][avatar]", input.file);
      await updateAvatar(user.slug, formData);
      setAvatarLoading(false);
      toast.success("Avatar Image Updated Successfully");
      setAvatar({ file: null, base64: null });
      dispatch(user_load_by_token_thunk(getCookies()));
    } catch (error) {
      setAvatarLoading(false);
      console.log(
        "🚀 ~ file: user-profile.js ~ line 54 ~ handleSaveAvatar ~ error",
        error
      );
    }
  };

  const handleEditProfile = () => {
    setProfile({
      first_name: user.first_name ? user.first_name : "",
      last_name: user.last_name ? user.last_name : "",
      phone_no: user.phone_no ? user.phone_no : "",
      phone_code: user.phone_code ? user.phone_code : "",
      website: user.website ? user.website : "",
      facebook: socialLinks.facebook ? socialLinks.facebook : "",
      instagram: socialLinks.instagram ? socialLinks.instagram : "",
      telegram: socialLinks.telegram ? socialLinks.telegram : "",
      twitter: socialLinks.twitter ? socialLinks.twitter : "",
      private: user.private,
      private_name: user.private_name ? user.private_name : "",
      description: user.desc ? user.desc : "",
    });
    setEditModal(true);
  };

  const BannerToggle = React.forwardRef(({ onClick }, ref) => (
    <ToolTip
      ref={ref}
      icon={
        <FaImage
          role="button"
          color="white"
          size={25}
          // onClick={() => bgImageRef.current.click()}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        />
      }
      content="Change banner"
      placement="top"
    />
  ));

  const UserIconToggle = React.forwardRef(({ onClick }, ref) => (
    <ToolTip
      ref={ref}
      temp
      icon={
        <div
          className="item-camera"
          role="button"
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          <FaCamera size={25} />
        </div>
      }
      content="Change banner"
      placement="top"
    />
  ));

  useEffect(() => {
    // Marketplace
    getUserOwnedNFTs();
    getUserFavNFTsApi();
    getUserOnSaleNFTs();

    // Drops
    getUserOwnedNFTsDrop();
    getUserFavNFTsApiDrop();

    getLootNFTCount();

    if (location.hash === "#web") {
      setShowAlert(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlyAuction]);

  useEffect(() => {
    if (page === "mynft") {
      mynft_scroll();
    } else {
      myprofile_scroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // For Marketplace

  const getUserOwnedNFTs = async (page, type = "all", remove = false) => {
    try {
      const filter = {
        sale_kind: type !== "all" ? type : "",
        keyword: !remove ? ownedSearch : "",
      };
      setNftListLoading(true);
      const result = await userOwnedMarketplace(page ? page : ownPage, filter);
      if (type === "all") {
        setOwnedNFTCount(result.data.data.total_count);
      }
      setOwnedNFTs(result.data.data);
      setOwnedNFTsList(result.data.data.nfts);
      setNftListLoading(false);

      if (result.data.data.total_count > 0) {
        setKey("marketplace");
      }
    } catch (error) {
      console.log(error);
      setNftListLoading(false);
    }
  };

  const getMoreUserOwnedNFTs = async (pageNo, type = "all", remove = false) => {
    try {
      const filter = {
        sale_kind: type !== "all" ? type : "",
        keyword: !remove ? ownedSearch : "",
      };
      setMoreLoading(true);
      const result = await userOwnedMarketplace(pageNo, filter);
      setOwnedNFTs(result.data.data);
      setOwnedNFTsList([...ownedNFTsList, ...result.data.data.nfts]);
      setMoreLoading(false);
    } catch (err) {
      setMoreLoading(false);
      console.log(
        "🚀 ~ file: wallet.js ~ line 28 ~ getTransactionHistory ~ err",
        err
      );
    }
  };

  const loadMoreOwnedNFTs = () => {
    if (ownedNFTs.next_page) {
      const value = filter.owned
        .filter((xx) => xx.checked === true)
        .map((obj, i) => obj.value);
      const ownedFilter = value[0] ? value[0] : "";

      getMoreUserOwnedNFTs(ownPage + 1, ownedFilter);
      setOwnPage(ownPage + 1);
    }
  };

  const getUserFavNFTsApi = async () => {
    try {
      const result = await userFavMarketplace(ownPage);
      setFavNFTs(result.data.data ? result.data.data : {});
      setFavNFTsList(result.data.data.nfts);
    } catch (error) {
      console.log(error);
    }
  };

  const getMoreUserFavNFTs = async (page) => {
    try {
      setMoreLoading(true);
      const result = await userFavMarketplace(page);
      setFavNFTs(result.data.data);
      setFavNFTsList([...favNFTsList, ...result.data.data.nfts]);
      setMoreLoading(false);
    } catch (err) {
      setMoreLoading(false);
      console.log(
        "🚀 ~ file: wallet.js ~ line 28 ~ getTransactionHistory ~ err",
        err
      );
    }
  };

  const loadMoreFavNFTs = () => {
    if (favNFTs.next_page) {
      getMoreUserFavNFTs(favPage + 1);
      setFavPage(favPage + 1);
    }
  };

  const getUserOnSaleNFTs = async () => {
    try {
      const filter = {
        sale_kind: "onsale",
        keyword: onsaleSearch,
      };
      const result = await userOwnedMarketplace(onSalePage, filter);
      setOnSaleNFTs(result.data.data);
      setOnSaleNFTsList(result.data.data.nfts);
    } catch (error) {
      console.log(error);
    }
  };

  const getMoreUserOnSaleNFTs = async (page) => {
    try {
      const filter = {
        sale_kind: "onsale",
        keyword: onsaleSearch,
      };
      setMoreLoading(true);
      const result = await userOwnedMarketplace(page, filter);
      setOnSaleNFTs(result.data.data);
      setOnSaleNFTsList([...onSaleNFTsList, ...result.data.data.nfts]);
      setMoreLoading(false);
    } catch (err) {
      setMoreLoading(false);
    }
  };

  const loadMoreOnSaleNFTs = () => {
    if (onSaleNFTs.next_page) {
      getMoreUserOnSaleNFTs(onSalePage + 1);
      setOnSalePage(onSalePage + 1);
    }
  };

  const handleTextSearch = (remove = false) => {
    if (marketplaceType === "owned") {
      const value = filter.owned
        .filter((xx) => xx.checked === true)
        .map((obj, i) => obj.value);
      const ownedFilter = value[0] ? value[0] : "";
      getUserOwnedNFTs(1, ownedFilter, remove);
    }
  };

  const handleKeyPressEvent = (event) => {
    if (event.key === "Enter") {
      handleTextSearch();
    }
  };

  const handleOwnedFilterType = (input) => {
    const info = { ...filter };
    info.owned = filter.owned.map((obj) => ({
      ...obj,
      checked: input ? input === obj.value : false,
    }));
    setFilter(info);
    setOwnPage(1);
    getUserOwnedNFTs(1, input);
  };

  const DropdownToggle = React.forwardRef(({ onClick }, ref) => (
    <div
      role="button"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <span className="text-capitalize">
        {(() => {
          if (key === "drops") {
            return "Drops";
          } else {
            return "Marketplace";
          }
        })()}
      </span>
    </div>
  ));

  //For Loot and NFT Count

  const getLootNFTCount = async () => {
    try {
      const result = await getTotalOwn(ownPageDrop);

      setLootCount(result.data.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: user-profile.js ~ line 1016 ~ getLootNFTCount ~ error",
        error
      );
    }
  };

  //For Drops

  const getUserOwnedNFTsDrop = async () => {
    try {
      setNftListLoadingDrop(true);
      const result = await userOwnedNFTsApi(ownPageDrop, onlyAuction);
      setOwnedNFTsDrop(result.data.data);
      setOwnedNFTsListDrop(result.data.data.nfts);
      setNftListLoadingDrop(false);
      if (result.data.data.total_count > 0) {
        setKey("drops");
      }
    } catch (error) {
      setNftListLoadingDrop(false);
    }
  };

  const getMoreUserOwnedNFTsDrop = async (pageNo) => {
    try {
      setMoreLoadingDrop(true);
      const result = await userOwnedNFTsApi(pageNo, onlyAuction);
      setOwnedNFTsDrop(result.data.data);
      setOwnedNFTsListDrop([...ownedNFTsListDrop, ...result.data.data.nfts]);
      setMoreLoadingDrop(false);
    } catch (err) {
      setMoreLoadingDrop(false);
    }
  };

  const loadMoreOwnedNFTsDrop = () => {
    if (ownedNFTsDrop.next_page) {
      getMoreUserOwnedNFTsDrop(ownPageDrop + 1);
      setOwnPageDrop(ownPageDrop + 1);
    }
  };

  const getUserFavNFTsApiDrop = async () => {
    try {
      const result = await userFavNFTsApi(ownPageDrop);
      setFavNFTsDrop(result.data.data ? result.data.data : {});
      setFavNFTsListDrop(result.data.data.nfts);
    } catch (error) {
      console.log(error);
    }
  };

  const getMoreUserFavNFTsDrop = async (page) => {
    try {
      setMoreLoadingDrop(true);
      const result = await userFavNFTsApi(page);
      setFavNFTsDrop(result.data.data);
      setFavNFTsListDrop([...favNFTsListDrop, ...result.data.data.nfts]);
      setMoreLoadingDrop(false);
    } catch (err) {
      setMoreLoadingDrop(false);
    }
  };

  const loadMoreFavNFTsDrop = () => {
    if (favNFTsDrop.next_page) {
      getMoreUserFavNFTsDrop(favPageDrop + 1);
      setFavPageDrop(favPageDrop + 1);
    }
  };

  const handleRemoveBanner = async (type) => {
    try {
      await removeImage(user.slug, type);

      if (type === "banner") toast.success("Banner Image Removed Successfully");
      else toast.success("Avatar Image Removed Successfully");

      dispatch(user_load_by_token_thunk(getCookies()));
    } catch (error) {
      console.log(
        "🚀 ~ file: user-profile.js ~ line 521 ~ handleRemoveBanner ~ error",
        error
      );
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={bgImageRef}
        style={{ display: "none" }}
        onClick={(event) => {
          event.target.value = null;
        }}
        onChange={handleBannerChange}
      />

      <input
        type="file"
        accept="image/*"
        ref={avatarImageRef}
        style={{ display: "none" }}
        onClick={(event) => {
          event.target.value = null;
        }}
        onChange={handleAvatarChange}
      />

      {/* <div className="col-md-10"> */}
      <div
        className="main-content-block profilepage container-fluid px-0"
        ref={myProfile}
      >
        <div className="row">
          <div className="col-md-12 px-0">
            <div
              className="banner-user"
              style={(() => {
                if (bg.base64) {
                  return { backgroundImage: `url(${bg.base64})` };
                } else if (user.banner_url) {
                  return { backgroundImage: `url(${user.banner_url})` };
                }
              })()}
            >
              <div className="banner-content">
                <div className="media">
                  <div className={`item-img ${avatar.base64 ? "edit" : ""}`}>
                    <img
                      src={(() => {
                        if (avatar.base64) {
                          return avatar.base64;
                        } else if (user.avatar_url) {
                          return user.avatar_url;
                        } else {
                          return userImg;
                        }
                      })()}
                      alt="User Avatar"
                    />

                    <Dropdown style={{ position: "initial" }}>
                      <Dropdown.Toggle as={UserIconToggle}></Dropdown.Toggle>

                      <Dropdown.Menu
                        align="start"
                        style={{ marginTop: "0 !important" }}
                        className="avatar-img"
                      >
                        <Dropdown.Item
                          as="button"
                          onClick={() => avatarImageRef.current.click()}
                        >
                          Upload Avatar
                        </Dropdown.Item>
                        {user.avatar_url && (
                          <>
                            <Dropdown.Divider />
                            <Dropdown.Item
                              as="button"
                              onClick={() => handleRemoveBanner("avatar")}
                            >
                              Remove Avatar
                            </Dropdown.Item>
                          </>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>

                    {avatarLoading && (
                      <div className="item-loading">
                        <BiLoaderAlt
                          size={25}
                          className="fa fa-spin"
                          color="white"
                        />
                      </div>
                    )}
                  </div>
                  <div className="media-body">
                    <div className="item-subtitle">
                      @{user.first_name}
                      {user.last_name}
                      {!user.private ? (
                        <ToolTip
                          icon={
                            <FaUserCheck
                              color="white"
                              size={20}
                              className="ms-2"
                            />
                          }
                          content="Your profile is public"
                          placement="top"
                        />
                      ) : (
                        <ToolTip
                          icon={
                            <FaUserLock
                              color="white"
                              size={20}
                              className="ms-2"
                            />
                          }
                          content="Your profile is private"
                          placement="top"
                        />
                      )}
                    </div>
                    <h3 className="item-title">
                      {user.first_name} {user.last_name}
                    </h3>
                  </div>
                </div>
                <div className="profile-icon" align="end">
                  <span className="edit-status">
                    {bg.base64 ? (
                      <>
                        {bgLoading ? (
                          <BiLoaderAlt
                            className="fa fa-spin"
                            color="white"
                            size={25}
                          />
                        ) : (
                          <>
                            <ToolTip
                              icon={
                                <FaCheck
                                  role="button"
                                  color="white"
                                  size={25}
                                  onClick={handleSaveBanner}
                                />
                              }
                              content="Save"
                              placement="top"
                            />

                            <ToolTip
                              icon={
                                <FaTimes
                                  role="button"
                                  color="white"
                                  size={25}
                                  onClick={() =>
                                    setBg({ file: null, base64: null })
                                  }
                                />
                              }
                              content="Cancel"
                              placement="top"
                            />
                          </>
                        )}
                      </>
                    ) : (
                      <Dropdown>
                        <Dropdown.Toggle
                          align="start"
                          drop="start"
                          as={BannerToggle}
                        ></Dropdown.Toggle>

                        <Dropdown.Menu align="end">
                          <Dropdown.Item
                            as="button"
                            onClick={() => bgImageRef.current.click()}
                          >
                            {/* <BsCloudUpload /> */}
                            Upload Banner
                          </Dropdown.Item>

                          {user.banner_url && (
                            <>
                              <Dropdown.Divider />
                              <Dropdown.Item
                                as="button"
                                onClick={() => handleRemoveBanner("banner")}
                              >
                                {/* <FaTrash /> */}
                                Remove Banner
                              </Dropdown.Item>
                            </>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </span>
                  <span className="edit-status">
                    <ToolTip
                      icon={
                        <MdEdit
                          role="button"
                          color="white"
                          size={25}
                          onClick={handleEditProfile}
                        />
                      }
                      content="Edit Profile"
                      placement="top"
                    />
                  </span>
                  {/* <FiShare2 role="button" color="white" size={25} /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="about-user">
              <div className="about-heading mb-4">
                <h3 className="about-title">About</h3>
              </div>
              <ul className="user-info">
                <li>
                  <label>Email</label>
                  <p>{user.email}</p>
                </li>
                <li>
                  <label>Description</label>
                  <p>{user.desc ? user.desc : "No description found"}</p>
                </li>
                <li>
                  <label>Website</label>
                  <p>
                    {user.website ? (
                      <a href={user.website} target="_blank" rel="noreferrer">
                        {user.website}
                      </a>
                    ) : (
                      "No website found"
                    )}
                  </p>
                </li>
                <li>
                  <label>Social Profiles</label>
                  <div className="social-icon">
                    {!socialLinks.facebook &&
                      !socialLinks.instagram &&
                      !socialLinks.telegram &&
                      !socialLinks.twitter &&
                      "No social profiles found"}

                    {socialLinks.facebook && (
                      <a
                        href={socialLinks.facebook}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={faImg} alt="facebook logo" />
                      </a>
                    )}

                    {socialLinks.instagram && (
                      <a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={inImg} alt="instagram logo" />
                      </a>
                    )}

                    {socialLinks.telegram && (
                      <a
                        href={socialLinks.telegram}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={teImg} alt="telegram logo" />
                      </a>
                    )}

                    {socialLinks.twitter && (
                      <a
                        href={socialLinks.twitter}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={twImg} alt="twitter logo" />
                      </a>
                    )}
                  </div>
                </li>
                <li>
                  <label>KYC Verification Status</label>
                  <p>
                    {!user?.kyc_status ? (
                      <button
                        className="btn btn-sm btn-dark rounded-pill"
                        type="button"
                        disabled={kycLoading}
                        onClick={getUserKYCDetails}
                      >
                        Verify KYC
                      </button>
                    ) : (
                      <>
                        <span className={`kycbox ${user?.kyc_status}`}>
                          {user?.kyc_status &&
                            user?.kyc_status.replace("_", " ")}
                        </span>

                        {(() => {
                          if (
                            user?.kyc_status === "failed" ||
                            user?.kyc_status === "expired" ||
                            user?.kyc_status === "cancelled" ||
                            user?.kyc_status === "pending" ||
                            user?.kyc_status === "partially_verified"
                          ) {
                            return (
                              <button
                                className="btn btn-sm btn-dark rounded-pill"
                                type="button"
                                disabled={kycLoading}
                                onClick={getUserKYCDetails}
                                // onClick={() => setKycModal(!kycModal)}
                              >
                                Retry KYC Process
                              </button>
                            );
                          }
                        })()}
                      </>
                    )}
                  </p>
                </li>
                {/* <li>
                  <label>Make Your NFTs Private</label>
                  <p>
                    <ToggleButton
                      inactiveLabel={<BiX size={20} />}
                      activeLabel={<BiCheck size={20} />}
                      value={privateNFT}
                      onToggle={(value) => {
                        setPrivateNFT(!value);
                        handlePrivateNFT(!value);
                      }}
                    />
                  </p>
                </li> */}
              </ul>
            </div>

            <div ref={mynft}>&nbsp;</div>

            {/* <Alert
              className="bg-white shadow bordered-2 m-5"
              variant="dark"
              show={showAlert}
              onClose={() => setShowAlert(false)}
              dismissible
            >
              <Alert.Heading className="text-center">
                We've automated our NFT claim process! Your NFTs will be claimed
                automatically after minting.
              </Alert.Heading>
            </Alert> */}

            <div className="about-user">
              <div className="row">
                <div className="col-md-12 ">
                  <div className="about-heading mynft-heading mb-4">
                    <div className="internal-heading-sec">
                      <h3 className="about-title">My NFTs</h3>
                      <div className="me-2">
                        <Dropdown className="drop_mkplace">
                          <span className="drop_mkplace_btn">
                            <Dropdown.Toggle
                              align="end"
                              drop="end"
                              as={DropdownToggle}
                            >
                              {" "}
                            </Dropdown.Toggle>
                            <BiCaretDown />
                          </span>
                          <Dropdown.Menu align="end">
                            <Dropdown.Item
                              as="button"
                              className={key === "drops" ? "active" : ""}
                              onClick={() => setKey("drops")}
                            >
                              Drops
                            </Dropdown.Item>
                            <Dropdown.Item
                              as="button"
                              className={key === "marketplace" ? "active" : ""}
                              onClick={() => setKey("marketplace")}
                            >
                              Marketplace
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    {key === "drops" ? (
                      <>
                        {" "}
                        <div className="top-flex-block-pill">
                          <div className="top-flex-block-pill-box">
                            <div
                              role={"button"}
                              className={`rounded-pill ps-3 pe-3 pt-1 pb-1 top-activity-filter-pill ${
                                dropsType === "owned" ? "active" : ""
                              }`}
                              onClick={() => setDropType("owned")}
                            >
                              Owned (
                              {ownedNFTsDrop.total_count
                                ? ownedNFTsDrop.total_count
                                : 0}
                              )
                            </div>
                            <div
                              role={"button"}
                              className={`rounded-pill ps-3 pe-3 pt-1 pb-1 top-activity-filter-pill ${
                                dropsType === "favs" ? "active" : ""
                              }`}
                              onClick={() => setDropType("favs")}
                            >
                              Favorites (
                              {favNFTsDrop.total_count
                                ? favNFTsDrop.total_count
                                : 0}
                              )
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {" "}
                        <div className="top-flex-block-pill">
                          <div className="top-flex-block-pill-box">
                            <div
                              role={"button"}
                              className={`rounded-pill ps-3 pe-3 pt-1 pb-1 top-activity-filter-pill ${
                                marketplaceType === "owned" ? "active" : ""
                              }`}
                              onClick={() => setMarketplaceType("owned")}
                            >
                              Owned ({ownedNFTCount ? ownedNFTCount : 0})
                            </div>

                            <div
                              role={"button"}
                              className={`rounded-pill ps-3 pe-3 pt-1 pb-1 top-activity-filter-pill ${
                                marketplaceType === "favs" ? "active" : ""
                              }`}
                              onClick={() => setMarketplaceType("favs")}
                            >
                              Favorites (
                              {favNFTs.total_count ? favNFTs.total_count : 0})
                            </div>
                          </div>
                          {marketplaceType === "owned" && (
                            <div className="search-block">
                              <div className="filt-flex-search">
                                <input
                                  type="text"
                                  value={ownedSearch}
                                  className="search-box-add owned"
                                  placeholder="Search here"
                                  onKeyPress={handleKeyPressEvent}
                                  onChange={(e) =>
                                    setOwnedSearch(e.target.value)
                                  }
                                />{" "}
                                <span
                                  role="button"
                                  className="search-button"
                                  onClick={handleTextSearch}
                                >
                                  <BiSearch size={15} />
                                </span>
                                {ownedSearch && (
                                  <span
                                    role="button"
                                    className="search-close-button"
                                    onClick={() => {
                                      setOwnedSearch("");
                                      handleTextSearch(true);
                                    }}
                                  >
                                    <AiOutlineClose size={15} />
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {key === "drops" && (
                <div className="row">
                  <div className="col">
                    <div className="wallet-box mt-0">
                      <div className="media">
                        <div className="media-body">
                          <div className="item-subtitle text-center">
                            Total Super Loot NFTs Bought
                          </div>
                          <div className="item-title text-center">
                            {lootCount?.bundle_count
                              ? lootCount.bundle_count
                              : 0}
                          </div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="media-body">
                          <div className="item-subtitle text-center">
                            Total NFTs You Got{" "}
                            <ToolTip
                              content={
                                "The Super Loot contains either 2 MCL player NFTs or 2 MCL player NFTs and 1 signed bat NFT."
                              }
                              icon={
                                <BsFillQuestionCircleFill
                                  size={16}
                                  className="ms-2 question-icon"
                                />
                              }
                              placement="top"
                            />
                          </div>
                          <div className="item-title text-center">
                            {lootCount?.nfts_count ? lootCount.nfts_count : 0}
                          </div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="media-body">
                          <div className="item-subtitle text-center">
                            Total Treasure Boxes You Got
                          </div>
                          <div className="item-title text-center">
                            {lootCount?.bundle_count
                              ? Math.floor(lootCount.bundle_count / 5)
                              : 0}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {lootCount?.parent_count > 0 && key === "drops" && (
                <div className="row">
                  <div className="col">
                    <div className="wallet-box mt-0">
                      <div className="media">
                        <div className="media-body">
                          <div className="item-subtitle text-center">
                            Total Auction Collections Bought
                          </div>
                          <div className="item-title text-center">
                            {lootCount?.parent_count
                              ? lootCount.parent_count
                              : 0}
                          </div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="media-body">
                          <div className="item-subtitle text-center">
                            Total NFTs You Got{" "}
                            <ToolTip
                              content={
                                "Each auction collection contains 1 Immortal Bat NFT and 2 MCL Player NFTs."
                              }
                              icon={
                                <BsFillQuestionCircleFill
                                  size={16}
                                  className="ms-2 question-icon"
                                />
                              }
                              placement="top"
                            />
                          </div>
                          <div className="item-title text-center">
                            {lootCount?.child_count ? lootCount.child_count : 0}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {key === "drops" ? (
                <>
                  {dropsType === "owned" ? (
                    <>
                      {nftListLoadingDrop ? (
                        <h5 className="text-center mt-3">Loading...</h5>
                      ) : (
                        <NFTOwn
                          nftList={ownedNFTsListDrop}
                          data={ownedNFTsDrop}
                        />
                      )}

                      {ownedNFTsDrop.next_page && (
                        <div className="d-flex justify-content-center w-100">
                          <button
                            className="btn btn-outline-dark w-50 h-25 text-center rounded-pill mt-2 mb-3"
                            type="button"
                            disabled={moreLoadingDrop}
                            onClick={loadMoreOwnedNFTsDrop}
                          >
                            {moreLoadingDrop ? "Loading..." : "Load More"}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <NFTFav nftList={favNFTsListDrop} data={favNFTsDrop} />
                      {favNFTsDrop.next_page && (
                        <div className="d-flex justify-content-center w-100">
                          <button
                            className="btn btn-outline-dark w-50 h-25 text-center rounded-pill mt-2 mb-3"
                            type="button"
                            disabled={moreLoadingDrop}
                            onClick={loadMoreFavNFTsDrop}
                          >
                            {moreLoadingDrop ? "Loading..." : "Load More"}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  {marketplaceType === "owned" && (
                    <div className="flex-block-pill">
                      {filter.owned.map((obj, i) => (
                        <div
                          key={`filter-pill-${i}`}
                          role={"button"}
                          className={`rounded-pill ps-3 pe-3 mb-3 me-3 pt-1 pb-1 activity-filter-pill ${
                            obj.checked ? "active" : ""
                          }`}
                          onClick={() => handleOwnedFilterType(obj.value)}
                        >
                          {obj.checked && (
                            <FaCheckCircle
                              color={"white"}
                              size={17}
                              className="me-2"
                            />
                          )}
                          {obj.name}{" "}
                        </div>
                      ))}
                    </div>
                  )}
                  {marketplaceType === "owned" ? (
                    <>
                      {nftListLoading ? (
                        <h5 className="text-center mt-3">Loading...</h5>
                      ) : (
                        <NFTOwn
                          nftList={ownedNFTsList}
                          data={ownedNFTs}
                          putOnSale={true}
                          isLive={state.marketLive}
                        />
                      )}

                      {ownedNFTs.next_page && (
                        <div className="d-flex justify-content-center w-100">
                          <button
                            className="btn btn-outline-dark w-50 h-25 text-center rounded-pill mt-2 mb-3"
                            type="button"
                            disabled={moreLoading}
                            onClick={loadMoreOwnedNFTs}
                          >
                            {moreLoading ? "Loading..." : "Load More"}
                          </button>
                        </div>
                      )}
                    </>
                  ) : marketplaceType === "favs" ? (
                    <>
                      <NFTFav
                        nftList={favNFTsList}
                        data={favNFTs}
                        marketplace
                      />
                      {favNFTs.next_page && (
                        <div className="d-flex justify-content-center w-100">
                          <button
                            className="btn btn-outline-dark w-50 h-25 text-center rounded-pill mt-2 mb-3"
                            type="button"
                            disabled={moreLoading}
                            onClick={loadMoreFavNFTs}
                          >
                            {moreLoading ? "Loading..." : "Load More"}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <NFTOnsale
                        nftList={onSaleNFTsList}
                        data={onSaleNFTs}
                        marketplace
                      />
                      {onSaleNFTs.next_page && (
                        <div className="d-flex justify-content-center w-100">
                          <button
                            className="btn btn-outline-dark w-50 h-25 text-center rounded-pill mt-2 mb-3"
                            type="button"
                            disabled={moreLoading}
                            onClick={loadMoreOnSaleNFTs}
                          >
                            {moreLoading ? "Loading..." : "Load More"}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={editModal}
        size="lg"
        onHide={() => setEditModal(false)}
        backdrop={"static"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="card-modal edit-profile-pop">
          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <InputText
                title={"First Name"}
                name="first_name"
                value={profile.first_name}
                required={validation.first_name}
                onChange={handleChangeEvent}
              />
              {validation.valid_first_name && (
                <span className="text-danger error-valid-text">
                  Please enter a valid first name
                </span>
              )}
            </div>
            <div className="col-12 col-md-6 mb-3">
              <InputText
                title={"Last Name"}
                name="last_name"
                value={profile.last_name}
                required={validation.last_name}
                onChange={handleChangeEvent}
              />
              {validation.valid_last_name && (
                <span className="text-danger error-valid-text">
                  Please enter a valid last name
                </span>
              )}
            </div>
            <div className="col-12 col-md-6 mb-3">
              <InputPhone
                title={"Mobile"}
                value={profile.phone_no}
                required={validation.phone_no}
                onChange={(e, c_code) => {
                  setProfile({
                    ...profile,
                    phone_no: e,
                    phone_code: c_code.countryCode.toUpperCase(),
                  });
                  if (e) {
                    setValidation({ ...validation, phone_no: false });
                  } else {
                    setValidation({ ...validation, phone_no: true });
                  }
                }}
              />
              {validation.valid_phone_no && (
                <span className="text-danger error-valid-text">
                  Please enter a valid mobile number
                </span>
              )}
            </div>
            <div className="col-12 col-md-6 mb-3">
              <InputText
                title="Website"
                name="website"
                value={profile.website}
                onChange={handleChangeEvent}
                onBlur={handleBlurURL}
              />
              {validation.valid_website && (
                <span className="text-danger error-valid-text">
                  Please enter a valid url
                </span>
              )}
            </div>
            <div className="col-12 col-md-6 mb-3">
              <InputText
                title="Facebook"
                name="facebook"
                value={profile.facebook}
                onChange={handleChangeEvent}
                onBlur={handleBlurURL}
              />
              {validation.valid_facebook && (
                <span className="text-danger error-valid-text">
                  Please enter a valid url
                </span>
              )}
            </div>
            <div className="col-12 col-md-6 mb-3">
              <InputText
                title="Instagram"
                name="instagram"
                value={profile.instagram}
                onChange={handleChangeEvent}
                onBlur={handleBlurURL}
              />
              {validation.valid_instagram && (
                <span className="text-danger error-valid-text">
                  Please enter a valid url
                </span>
              )}
            </div>
            <div className="col-12 col-md-6 mb-3">
              <InputText
                title="Telegram"
                name="telegram"
                value={profile.telegram}
                onChange={handleChangeEvent}
                onBlur={handleBlurURL}
              />
              {validation.valid_telegram && (
                <span className="text-danger error-valid-text">
                  Please enter a valid url
                </span>
              )}
            </div>
            <div className="col-12 col-md-6 mb-3">
              <InputText
                title="Twitter"
                name="twitter"
                value={profile.twitter}
                onChange={handleChangeEvent}
                onBlur={handleBlurURL}
              />
              {validation.valid_twitter && (
                <span className="text-danger error-valid-text">
                  Please enter a valid url
                </span>
              )}
            </div>
            <div
              className={`col-12 col-md-6 mb-3 d-flex align-self-center ${
                profile.private ? "pt-4" : ""
              }`}
            >
              <label className="toggle-private-title w-100">
                Make Your Profile Private
              </label>
              <div>
                <ToggleButton
                  inactiveLabel={<BiX size={20} />}
                  activeLabel={<BiCheck size={20} />}
                  value={profile.private}
                  onToggle={(value) => {
                    setProfile({ ...profile, private: !value });
                  }}
                />
              </div>
            </div>
            {profile.private && (
              <div className="col-12 col-md-6 mb-3">
                <InputText
                  title="Private Name"
                  name="private_name"
                  value={profile.private_name}
                  required={validation.private_name}
                  onChange={handleChangeEvent}
                />
                {validation.valid_private_name && (
                  <span className="text-danger error-valid-text">
                    Please enter a private name
                  </span>
                )}
              </div>
            )}
            <div className="col-12 mb-3">
              <InputTextArea
                title="Description"
                name="description"
                value={profile.description}
                onChange={handleChangeEvent}
                rows={3}
              />
            </div>
          </div>
          <div className="mt-">
            <button
              disabled={loading}
              className="btn btn-dark"
              onClick={handleUpdate}
              type="button"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Remove banner image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure that you want to remove your banner image?
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-outline-dark"
            type="button"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button className="btn btn-dark" type="button" onClick={handleClose}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={kycModal}
        size="lg"
        onHide={() => setKycModal(false)}
        backdrop={"static"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Start your identity check</Modal.Title>
        </Modal.Header>
        <Modal.Body className="card-modal edit-profile-pop">
          <div className="row">
            {step === "step1" && (
              <>
                <article className="kyc-step-1">
                  <p>Select your country of citizenship</p>
                  <ButtonGroup className="mb-2">
                    {nationalityRadio.map((nationality, idx) => (
                      <CustomToggle
                        key={idx}
                        id={`nationality-${idx}`}
                        type="radio"
                        variant="outline-dark"
                        name="nationality"
                        value={nationality.value}
                        checked={kycDetails.nationality === nationality.value}
                        onChange={(e) =>
                          setKycDetails({
                            ...kycDetails,
                            nationality: e.currentTarget.value,
                            country: e.currentTarget.value === "IN" ? "IN" : "",
                            state: "",
                            city: "",
                            pincode: "",
                            firstName: "",
                            lastName: "",
                            line1: "",
                            line2: "",
                            agree: false,
                          })
                        }
                      >
                        {nationality.name}
                      </CustomToggle>
                    ))}
                  </ButtonGroup>
                </article>
              </>
            )}

            {step === "step2" && kycDetails.nationality === "IN" && (
              <>
                <article className="kyc-step-2">
                  <p>Select your account type</p>
                  <ButtonGroup className="mb-2">
                    {userTypeRadio.map((userType, idx) => (
                      <CustomToggle
                        key={idx}
                        id={`userType-${idx}`}
                        type="radio"
                        variant="outline-dark"
                        name="user_type"
                        value={userType.value}
                        checked={kycDetails.user_type === userType.value}
                        onChange={(e) =>
                          setKycDetails({
                            ...kycDetails,
                            user_type: e.currentTarget.value,
                          })
                        }
                      >
                        {userType.name}
                      </CustomToggle>
                    ))}
                  </ButtonGroup>

                  <div className="col-12 mb-3">
                    <InputText
                      title={"PAN"}
                      className={"text-transform-uppercase"}
                      name="pan"
                      value={kycDetails.pan}
                      required={kycValidation.pan}
                      requiredBottom={kycValidation.pan}
                      onChange={handleKycChangeEvent}
                    />
                  </div>
                  {kycDetails.user_type === "business" && (
                    <div className="col-12 mb-3">
                      <InputText
                        title={"TAN"}
                        className={"text-transform-uppercase"}
                        name="tan"
                        value={kycDetails.tan}
                        required={kycValidation.tan}
                        requiredBottom={kycValidation.tan}
                        onChange={handleKycChangeEvent}
                      />
                    </div>
                  )}
                  <div className="col-12 mb-3">
                    <p>Do you have GSTIN?</p>
                    <ButtonGroup className="mb-2">
                      {havingGSTRadio.map((gst, idx) => (
                        <CustomToggle
                          key={idx}
                          id={`havingGST-${idx}`}
                          type="radio"
                          variant="outline-dark"
                          name="havingGST"
                          value={gst.value}
                          checked={kycDetails.havingGST === gst.value}
                          onChange={(e) =>
                            setKycDetails({
                              ...kycDetails,
                              havingGST: e.currentTarget.value,
                            })
                          }
                        >
                          {gst.name}
                        </CustomToggle>
                      ))}
                    </ButtonGroup>
                  </div>
                  {kycDetails.havingGST === "yes" && (
                    <div className="col-12 mb-3">
                      <InputText
                        title={"GSTIN"}
                        className={"text-transform-uppercase"}
                        name="gst"
                        value={kycDetails.gst}
                        onChange={handleKycChangeEvent}
                      />
                    </div>
                  )}
                  {kycDetails.havingGST === "no" && (
                    <div className="col-12 mb-3">
                      <div className="agree-box">
                        <input
                          className="gstAgree"
                          name="gstAgree"
                          role={"button"}
                          type="checkbox"
                          checked={kycDetails.gstAgree}
                          required={kycValidation.gstAgree}
                          onChange={() =>
                            setKycDetails({
                              ...kycDetails,
                              gstAgree: !kycDetails.gstAgree,
                            })
                          }
                        />{" "}
                        I hereby declare that I am not liable to get registered
                        under the GST Act or obtain a GSTIN
                      </div>
                    </div>
                  )}
                </article>
              </>
            )}

            {step === "step3" && (
              <>
                <article className="kyc-step-3">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="input-title">Country</label>{" "}
                    {kycDetails.nationality === "IN" ? (
                      <Select
                        options={countriesOnlyIndia.map((o) => ({
                          label: o.name,
                          value: o.code2,
                        }))}
                        value={
                          kycDetails.country && {
                            label: countriesOnlyIndia.find(
                              (o) => o.code2 === kycDetails.country
                            ).name,
                            value: kycDetails.country,
                          }
                        }
                        styles={crispStyle}
                        onChange={(data) => {
                          setKycDetails({
                            ...kycDetails,
                            country: data.value,
                            state: null,
                          });
                          if (data.value) {
                            setKycValidation({
                              ...kycValidation,
                              country: false,
                            });
                          } else {
                            setKycValidation({
                              ...kycValidation,
                              country: true,
                            });
                          }
                        }}
                      />
                    ) : (
                      <Select
                        options={countriesWithoutIndia.map((o) => ({
                          label: o.name,
                          value: o.code2,
                        }))}
                        value={
                          kycDetails.country && {
                            label: countriesWithoutIndia.find(
                              (o) => o.code2 === kycDetails.country
                            ).name,
                            value: kycDetails.country,
                          }
                        }
                        styles={crispStyle}
                        onChange={(data) => {
                          setKycDetails({
                            ...kycDetails,
                            country: data.value,
                            state: null,
                          });
                          if (data.value) {
                            setKycValidation({
                              ...kycValidation,
                              country: false,
                            });
                          } else {
                            setKycValidation({
                              ...kycValidation,
                              country: true,
                            });
                          }
                        }}
                      />
                    )}
                    {kycValidation.country && (
                      <small className="text-danger font-10">(Required)</small>
                    )}
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="input-title">State</label>{" "}
                    <Select
                      isDisabled={!kycDetails.country}
                      styles={crispStyle}
                      value={
                        kycDetails.state && {
                          label: countries
                            .find((o) => o.code2 === kycDetails.country)
                            .states.find((o) => o.code === kycDetails.state)
                            ?.name,
                          value: kycDetails.state,
                        }
                      }
                      options={
                        kycDetails.country &&
                        countries
                          .find((o) => o.code2 === kycDetails.country)
                          .states.map((o) => ({
                            label: o.name,
                            value: o.code,
                          }))
                      }
                      onChange={(data) => {
                        setKycDetails({ ...kycDetails, state: data.value });
                        if (data.value) {
                          setKycValidation({ ...kycValidation, state: false });
                        } else {
                          setKycValidation({ ...kycValidation, state: true });
                        }
                      }}
                    />
                    {kycValidation.state && (
                      <small className="text-danger font-10">(Required)</small>
                    )}
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <InputText
                      title="First Name"
                      name="firstName"
                      value={kycDetails.firstName}
                      required={kycValidation.firstName}
                      requiredBottom={kycValidation.firstName}
                      onChange={handleKycChangeEvent}
                    />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <InputText
                      title="Last Name"
                      name="lastName"
                      value={kycDetails.lastName}
                      required={kycValidation.lastName}
                      requiredBottom={kycValidation.lastName}
                      onChange={handleKycChangeEvent}
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <InputText
                      title="Address Line 1"
                      name="line1"
                      value={kycDetails.line1}
                      required={kycValidation.line1}
                      requiredBottom={kycValidation.line1}
                      onChange={handleKycChangeEvent}
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <InputText
                      title="Address Line 2"
                      name="line2"
                      value={kycDetails.line2}
                      onChange={handleKycChangeEvent}
                    />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <InputText
                      title="City"
                      value={kycDetails.city}
                      required={kycValidation.city}
                      requiredBottom={kycValidation.city}
                      name="city"
                      onChange={handleKycChangeEvent}
                    />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <InputText
                      title="Pincode"
                      value={kycDetails.pincode}
                      required={kycValidation.pincode}
                      requiredBottom={kycValidation.pincode}
                      name="pincode"
                      onChange={handleKycChangeEvent}
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <div className="agree-box">
                      <input
                        className={`agree ${
                          kycValidation.agree && "notSelect"
                        }`}
                        name="agree"
                        role={"button"}
                        type="checkbox"
                        checked={kycDetails.agree}
                        required={kycValidation.agree}
                        onChange={() =>
                          setKycDetails({
                            ...kycDetails,
                            agree: !kycDetails.agree,
                          })
                        }
                      />{" "}
                      By clicking the "Proceed" button, I hereby declare that
                      the information provided is true and correct.
                      <div>
                        {kycValidation.agree && (
                          <small className="text-danger font-10">
                            Please check declaration to proceed
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </>
            )}
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="modal-footer-btn-grp">
                {step !== "step1" && (
                  <button
                    className="btn btn-dark prev-btn"
                    onClick={() => {
                      if (step === "step3") {
                        if (kycDetails.nationality === "OTHERS") {
                          setStep("step1");
                        } else {
                          setStep("step2");
                        }
                      } else if (step === "step2") {
                        setStep("step1");
                      }
                    }}
                    type="button"
                  >
                    Previous
                  </button>
                )}

                <button
                  disabled={(() => {
                    if (kycLoading) {
                      return true;
                    } else if (step === "step1" && !kycDetails.nationality) {
                      return true;
                    } else if (
                      step === "step2" &&
                      (!kycDetails.user_type || !kycDetails.pan)
                    ) {
                      return true;
                    } else if (
                      step === "step2" &&
                      kycDetails.user_type === "business" &&
                      !kycDetails.tan
                    ) {
                      return true;
                    } else if (
                      step === "step2" &&
                      kycDetails.havingGST === "yes" &&
                      !kycDetails.gst
                    ) {
                      return true;
                    } else if (
                      step === "step2" &&
                      kycDetails.havingGST === "no" &&
                      !kycDetails.gstAgree
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  })()}
                  className="btn btn-dark  next-btn"
                  onClick={() => {
                    if (step === "step1") {
                      if (kycDetails.nationality === "OTHERS") {
                        setStep("step3");
                      } else {
                        setStep("step2");
                      }
                    } else if (step === "step2") {
                      setStep("step3");
                    } else if (step === "step3") {
                      handleKYC();
                    }
                  }}
                  type="button"
                >
                  {(() => {
                    if (step === "step1") {
                      return "Next";
                    } else if (step === "step2") {
                      return "Next";
                    } else if (step === "step3") {
                      return kycLoading
                        ? "Loading... Please wait..."
                        : "Proceed";
                    }
                  })()}
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserProfile;
