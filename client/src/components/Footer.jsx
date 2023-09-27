import { Box, Typography, Link } from "@mui/material";
import { ModeContext } from "../context/Mode";
import { useContext } from "react";

export const Footer = () => {
  const { mode, setMode } = useContext(ModeContext);
  return (
    <Box sx={{ mt: 5, paddingBottom: "3em" }}>
      <Typography variant="body2" color="text.secondary" align="center">
        {"CraftedBy: "}
        <Link
          color="inherit"
          href="https://github.com/cCody34"
          sx={{ marginRight: "1em" }}
        >
          Charlotte Cody
        </Link>
        <Link
          color="inherit"
          href="https://github.com/chris-butterworth"
          sx={{ marginRight: "1em" }}
        >
          Chris Butterworth
        </Link>
        <Link
          color="inherit"
          href="https://github.com/Lex5mith"
          sx={{ marginRight: "1em" }}
        >
          Lex Smith
        </Link>
        <Link
          color="inherit"
          href="https://github.com/PGallagher93"
          sx={{ marginRight: "1em" }}
        >
          Phil Gallagher
        </Link>
        <Link
          color="inherit"
          href="https://github.com/TypeError92"
          sx={{ marginRight: "1em" }}
        >
          Simon Walgenbach
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};
