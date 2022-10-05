import { useEffect, useState } from "react";
import WrapperSingle from "../../components/gems/wrapper-single";
import Art from "../../components/art";
import { getArt } from "../../api/methods";
import { useHistory, useParams } from "react-router-dom";

const ArtPage = () => {
  const [art, setArt] = useState({});
  const history = useHistory();
  const { artId = null } = useParams();

  const handleGetArt = async () => {
    if (!artId) history.push("/not-found");
    try {
      let { data } = await getArt(artId);
      setArt(data?.data?.artwork);
    } catch (error) {
      console.log("Error in fetching artwork", error);
    }
  };

  useEffect(() => {
    handleGetArt();
  }, []);

  return (
    <WrapperSingle>
      <Art art={art} />
    </WrapperSingle>
  );
};

export default ArtPage;
