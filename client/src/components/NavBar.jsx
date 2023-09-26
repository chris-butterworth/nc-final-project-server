import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ModeContext } from "../context/Mode.jsx";
import { lightTheme, darkTheme } from "../themes";
import pills from "../assets/red-pill-blue-pill.jpg";
import crayon from "../assets/crayon.png";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.js";
import socket from "../socket.js";
import { Link } from "react-router-dom";

const NavBar = ({ username, setUsername, setRoom }) => {
  const { mode, setMode } = useContext(ModeContext);

  const handleModeChange = () => {
    if (mode === lightTheme) {
      setMode(darkTheme);
    } else {
      setMode(lightTheme);
    }
  };

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        setUsername("");
        setRoom("");
        socket.emit("leaveRoom");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Button component={Link} to="/" variant="text" color="inherit">
              Anagram Game
            </Button>
            <Button
              component={Link}
              to="/thebuild"
              variant="text"
              color="inherit"
            >
              The Build
            </Button>
          </div>
          <div>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ height: "40px" }}
              onClick={handleModeChange}
            >
              {mode.palette.mode === "dark" ? (
                <Box component="img" sx={{ height: "40px" }} src={crayon}></Box>
              ) : (
                <Box
                  component="img"
                  sx={{ height: "40px", mixBlendMode: "multiply" }}
                  src={pills}
                ></Box>
              )}
            </IconButton>
            <Button color="inherit" onClick={userSignOut}>
              {username ? <>Sign Out</> : <>Sign in</>}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
