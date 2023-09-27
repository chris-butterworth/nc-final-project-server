import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import python from "../assets/stackLogos/python.png";
import html from "../assets/stackLogos/html.png";
import css from "../assets/stackLogos/css.png"


const theTeam = [
  {
    name: "Charlotte",
    img: "https://media.licdn.com/dms/image/D4E03AQFBzTkbC70hMw/profile-displayphoto-shrink_800_800/0/1690316681956?e=1701302400&v=beta&t=oBjPFPPUW5d5q-RQusOHVeHCabUmd9c11otZ4cDByis",
    github: "https://github.com/cCody34",
    linkedIn: "https://www.linkedin.com/in/charlotte-cody-1b9894172/",
  },
  {
    name: "Chris",
    img: "https://media.licdn.com/dms/image/D4E35AQHi_A8O3s0xag/profile-framedphoto-shrink_800_800/0/1693294639294?e=1696410000&v=beta&t=D3B-GDl6Tb2gqOneh8p9HHb3O9mCpjg-kwfLKbU0U8M",
    github: "https://github.com/chris-butterworth",
    linkedIn: "https://www.linkedin.com/in/chris-butterworth-74b77a25a/",
  },
  {
    name: "Lex",
    img: "https://media.licdn.com/dms/image/D4D03AQFWZSmgOi8F5A/profile-displayphoto-shrink_800_800/0/1691162112518?e=1701302400&v=beta&t=CaiaZJKV43deYIPTItG66o4_t_qCDzHjKnfMGmGkZOs",
    github: "https://github.com/Lex5mith",
    linkedIn: "https://www.linkedin.com/in/lex-smith-084a6a42/",
  },
  {
    name: "Phil",
    img: "https://scontent-man2-1.xx.fbcdn.net/v/t1.6435-9/44392243_10215917139093997_4234685840862740480_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=rFGc5kd3TTQAX-67svc&_nc_ht=scontent-man2-1.xx&oh=00_AfChL70XyxfJbKm3SqwvTY6blvNAmuWZbvd3mux97uybBw&oe=653B57AF",
    github: "https://github.com/PGallagher93",
    linkedIn: "https://www.linkedin.com/in/philip-gallagher-a24048285/",
  },
  {
    name: "Simon",
    img: "https://pbs.twimg.com/profile_images/1366092575560581120/3xBexFDs_400x400.jpg",
    github: "https://github.com/TypeError92",
    linkedIn: "https://www.linkedin.com/in/simon-walgenbach-b06960142/",
  },
  {
    name: "Bootcamp Details: Northcoders",
    img: "https://pbs.twimg.com/profile_images/1333392601450426370/x_DT51WI_400x400.jpg",
    github: "https://github.com/northcoders",
    linkedIn: "https://www.linkedin.com/company/northcoders/mycompany/",
  },
];

const TechLogo = ({ src, alt }) => (
  <Grid container direction="column" alignItems="center">
    <img
      src={src}
      alt={alt}
      width="80"
      height="80"
      style={{ marginBottom: "8px" }}
    />
    <Typography variant="caption">{alt}</Typography>
  </Grid>
);

const LanguageLogo = ({ src, alt }) => (
  <Grid container direction="column" alignItems="center">
    <img
      src={src}
      alt={alt}
      width="80"
      height="80"
      style={{ marginBottom: "8px" }}
    />
    <Typography variant="caption">{alt}</Typography>
  </Grid>
);

const ProjectDescription = () => (
  <Paper
    sx={{
      marginTop: "3em",
      marginBottom: "2em",
      padding: "2em",
      textAlign: "center",
    }}
  >
    <Typography
      variant="h5"
      gutterBottom
      sx={{ marginBottom: "1em", textAlign: "center" }}
    >
      This project was created as a portfolio piece in the final 8 days of the
      industry-leading Northcoders software engineering boot camp.
    </Typography>

    <Typography variant="body2" gutterBottom sx={{ marginBottom: "3em" }}>
      We decided to build a game to test our full-stack skills and see if we
      could build a real-time multiplayer game using this tech stack:
    </Typography>

    <Grid
      container
      justifyContent="center"
      spacing={3}
      sx={{ marginBottom: "1em", textAlign: "center" }}
    >
      <Grid item>
        <TechLogo src="https://socket.io/images/logo.svg" alt="Socket.IO" />
      </Grid>
      <Grid item>
        <TechLogo
          src="https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png"
          alt="React"
        />
      </Grid>
      <Grid item>
        <TechLogo
          src="https://www.gstatic.com/devrel-devsite/prod/v47c000584df8fd5ed12554bcabcc16cd4fd28aee940bdc8ae9e35cab77cbb7da/firebase/images/lockup.svg"
          alt="Firebase"
        />
      </Grid>
      <Grid item>
        <TechLogo src="https://mui.com/static/logo.png" alt="Material UI" />
      </Grid>
      <Grid item>
        <TechLogo
          src="https://ih1.redbubble.net/image.2488655049.9084/st,small,507x507-pad,600x600,f8f8f8.jpg"
          alt="Flask"
        />
      </Grid>
      <Grid item>
        <TechLogo
          src="https://w7.pngwing.com/pngs/925/447/png-transparent-express-js-node-js-javascript-mongodb-node-js-text-trademark-logo.png"
          alt="Express"
        />
      </Grid>
      <Grid item>
        <TechLogo
          src="https://cdn-icons-png.flaticon.com/512/919/919825.png"
          alt="Node.js"
        />
      </Grid>
    </Grid>

    <Typography variant="h6" gutterBottom sx={{ marginTop: "2em", marginBottom: "3em" }}>
      Languages used:
    </Typography>

    <Grid
      container
      justifyContent="center"
      spacing={3}
      sx={{ marginBottom: "1em", textAlign: "center" }}
    >
      <Grid item>
        <LanguageLogo src="https://cdn-icons-png.flaticon.com/512/5968/5968292.png" alt="JavaScript" />
      </Grid>
      <Grid item>
        <LanguageLogo
          src={python}
          alt="Python"
        />
      </Grid>
      <Grid item>
        <LanguageLogo
          src={html}
          alt="HTML"
        />
      </Grid>
      <Grid item>
        <LanguageLogo src={css}
        alt="CSS" />
      </Grid>
    </Grid>
    <Typography variant="body2" gutterBottom sx={{ marginBottom: "1em", textAlign: "center" }}>
      We think that we've done a pretty good job and exceeded our MVP goals.
      There's obviously more we would have liked to have done, but 8 days is
      pretty short, and we're happy with this initial version. We may reunite
      the team to develop some more features, or we may simply move on to bigger
      and better things.
    </Typography>

    <Typography variant="body2" gutterBottom sx={{ marginBottom: "1em", textAlign: "center" }}>
      Either way, thank you for stopping by & playing. If you'd like to talk to
      any of us, use the links below to connect with us. If you're wondering how
      we achieved such levels of wizardry, this is a public repo so follow one of the
      the GitHub links below.
    </Typography>

   
  </Paper>
);

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
      <Typography variant="subtitle1" sx={{ paddingTop: "8px" }}>
        {name}
      </Typography>
      <div style={{ paddingTop: "8px" }}>
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
      <ProjectDescription />
      <Paper>
      <Typography variant="h4" gutterBottom sx={{ marginTop: "1em", marginBottom: "1em", paddingTop: "1em", textAlign: "center" }}>
      Team Members
    </Typography>
      <Grid container spacing={1} sx={{ paddingTop: "1em", paddingBottom: "3em"}}>
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
