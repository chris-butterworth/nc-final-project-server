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

export const TheBuild = () => {
  return (
    <Container>
      <Paper sx={{ marginTop: "3em", padding: "2em" }}>
        <Typography variant="h4" gutterBottom>
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
            <Avatar
              alt="Member 1"
              src="/path-to-image.jpg"
              sx={{ width: 100, height: 100 }}
            >
              M1
            </Avatar>
            <Typography variant="subtitle1">Charlotte</Typography>
            <div>
              <IconButton
                color="primary"
                aria-label="GitHub"
                href="https://github.com/member1"
                target="_blank"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="LinkedIn"
                href="https://linkedin.com/in/member1"
                target="_blank"
              >
                <LinkedInIcon />
              </IconButton>
            </div>
          </Grid>

          {/* Member 2 */}
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
            <Avatar
              alt="Member 2"
              src="/path-to-image.jpg"
              sx={{ width: 100, height: 100 }}
            >
              M2
            </Avatar>
            <Typography variant="subtitle1">Chris</Typography>
            <div>
              <IconButton
                color="primary"
                aria-label="GitHub"
                href="https://github.com/member2"
                target="_blank"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="LinkedIn"
                href="https://linkedin.com/in/member2"
                target="_blank"
              >
                <LinkedInIcon />
              </IconButton>
            </div>
          </Grid>

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
            <Avatar
              alt="Member 2"
              src="/path-to-image.jpg"
              sx={{ width: 100, height: 100 }}
            >
              M2
            </Avatar>
            <Typography variant="subtitle1">Lex</Typography>
            <div>
              <IconButton
                color="primary"
                aria-label="GitHub"
                href="https://github.com/member2"
                target="_blank"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="LinkedIn"
                href="https://linkedin.com/in/member2"
                target="_blank"
              >
                <LinkedInIcon />
              </IconButton>
            </div>
          </Grid>
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
            <Avatar
              alt="Member 2"
              src="/path-to-image.jpg"
              sx={{ width: 100, height: 100 }}
            >
              M2
            </Avatar>
            <Typography variant="subtitle1">Phil</Typography>
            <div>
              <IconButton
                color="primary"
                aria-label="GitHub"
                href="https://github.com/member2"
                target="_blank"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="LinkedIn"
                href="https://linkedin.com/in/member2"
                target="_blank"
              >
                <LinkedInIcon />
              </IconButton>
            </div>
          </Grid>
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
            <Avatar
              alt="Member 2"
              src="/path-to-image.jpg"
              sx={{ width: 100, height: 100 }}
            >
              M2
            </Avatar>
            <Typography variant="subtitle1">Simon</Typography>
            <div>
              <IconButton
                color="primary"
                aria-label="GitHub"
                href="https://github.com/member2"
                target="_blank"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="LinkedIn"
                href="https://linkedin.com/in/member2"
                target="_blank"
              >
                <LinkedInIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
