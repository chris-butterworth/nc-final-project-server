import {  useContext } from "react";
import { ModeContext } from "../context/Mode";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import agentBrown from "../assets/darkAvatars/agentBrown.jpeg";
import morpheus from "../assets/darkAvatars/morpheus.jpeg";
import agentSmith from "../assets/darkAvatars/agentSmith.jpeg";
import cypher from "../assets/darkAvatars/cypher.jpeg";
import neo from "../assets/darkAvatars/neo.jpeg";
import theOracle from "../assets/darkAvatars/theOracle.jpeg";
import trinity from "../assets/darkAvatars/trinity.jpeg";
import whiteRabbit from "../assets/darkAvatars/whiteRabbit.jpeg";
import personA from "../assets/lightAvatars/personA.jpeg";
import personB from "../assets/lightAvatars/personB.jpeg";
import personC from "../assets/lightAvatars/personC.jpeg";
import personD from "../assets/lightAvatars/personD.jpeg";
import personE from "../assets/lightAvatars/personE.jpeg";
import personF from "../assets/lightAvatars/personF.jpeg";
import personG from "../assets/lightAvatars/personG.jpeg";
import personH from "../assets/lightAvatars/personH.jpeg";
import personI from "../assets/lightAvatars/personI.jpeg";
import { useEffect } from "react";
import { Typography } from "@mui/material";

const darkAvatars = [
  morpheus,
  neo,
  trinity,
  agentSmith,
  agentBrown,
  cypher,
  theOracle,
  whiteRabbit,
];

const lightAvatars = [
  personA,
  personB,
  personC,
  personD,
  personE,
  personF,
  personG,
  personH,
  personI,
];

const AvatarGallery = ({
  avatars,
  setAvatars,
  currentAvatarIndex,
  setCurrentAvatarIndex,
}) => {
  const { mode, setMode } = useContext(ModeContext);

  useEffect(() => {
    if (mode.palette.mode === "light") {
      setAvatars(lightAvatars);
    } else {
      setAvatars(darkAvatars);
    }
  }, [mode]);

  const handleNextAvatar = () => {
    setCurrentAvatarIndex((prevIndex) =>
      prevIndex === avatars.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevAvatar = () => {
    setCurrentAvatarIndex((prevIndex) =>
      prevIndex === 0 ? avatars.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      style={{
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        style={{
          paddingBottom: "0.5em",
        }}
      >
        Select Your Avatar
      </Typography>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton onClick={handlePrevAvatar}>
          <ArrowBackIcon />
        </IconButton>
        <Avatar
          src={avatars[currentAvatarIndex]}
          alt={`Avatar ${currentAvatarIndex + 1}`}
          sx={{ width: 100, height: 100 }}
        />
        <IconButton onClick={handleNextAvatar}>
          <ArrowForwardIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default AvatarGallery;
