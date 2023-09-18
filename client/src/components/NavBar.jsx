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

const NavBar = () => {
  const { mode, setMode } = useContext(ModeContext);

  const handleModeChange = () => {
    if (mode === lightTheme) {
      setMode(darkTheme);
    } else {
      setMode(lightTheme);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Anagram Game
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleModeChange}
          >
            <LightModeIcon />
          </IconButton>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
