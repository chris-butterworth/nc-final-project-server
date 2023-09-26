import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Paper } from "@mui/material";

const theTeam = [
  {
    name: "Charlotte",
    img: "",
    github: "https://github.com/cCody34",
    linkedIn: "https://www.linkedin.com/in/charlotte-cody-1b9894172/",
  },
  {
    name: "Chris",
    img: "",
    github: "https://github.com/chris-butterworth",
    linkedIn: "https://www.linkedin.com/in/chris-butterworth-74b77a25a/",
  },
  {
    name: "Lex",
    img: "",
    github: "https://github.com/Lex5mith",
    linkedIn: "https://www.linkedin.com/in/lex-smith-084a6a42/",
  },
  {
    name: "Phil",
    img: "",
    github: "https://github.com/PGallagher93",
    linkedIn: "https://www.linkedin.com/in/philip-gallagher-a24048285/",
  },
  {
    name: "Simon",
    img: "",
    github: "https://github.com/TypeError92",
    linkedIn: "https://www.linkedin.com/in/simon-walgenbach-b06960142/",
  },
];

const TeamMember = ({ name, img, linkedIn, github }) => {
  return (
    <Grid
      item
      xs={6}
      sm={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Avatar alt={name} src={img} sx={{ width: 100, height: 100 }}>
        M1
      </Avatar>
      <Typography variant="subtitle1">{name}</Typography>
      <div>
        <IconButton
          color="primary"
          aria-label="GitHub"
          href={github}
          target="_blank"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="LinkedIn"
          href={linkedIn}
          target="_blank"
        >
          <LinkedInIcon />
        </IconButton>
      </div>
    </Grid>
  );
};

export const TheBuild = () => {
  return (
    <Container>
      <Paper sx={{ marginTop: "3em", padding: "2em", textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          Project Details
        </Typography>

        <TextField
          id="project-details"
          label="Enter project details"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
        />

        <Typography variant="h4" gutterBottom>
          Team Members
        </Typography>

        <Grid container spacing={2}>
          {theTeam.map((teamMember) => (
            <TeamMember
              key={teamMember.name}
              name={teamMember.name}
              img={teamMember.img}
              linkedIn={teamMember.linkedIn}
              github={teamMember.github}
            />
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};
