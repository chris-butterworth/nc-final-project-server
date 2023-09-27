import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: `"Share Tech Mono", monospace`,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontFamily: `"Share Tech Mono", monospace`,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: `"SpaceMono", "Share Tech Mono", "Fira Mono", "OverpassMono", monospace`,
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
        },
        h3: {
          color: "#00FF41",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: `"SpaceMono", "Share Tech Mono", "Fira Mono", "OverpassMono", monospace`,
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
        },
        h3: {
          color: "#00FF41",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: "5px",
          padding: "5px",
          fontSize: "1rem",
          fontFamily: "Space Mono",
        },
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#00FF41",
    },
    secondary: {
      main: "#008F11",
    },
    info: {
      main: "#003B00",
    },
  },
});

export const lightTheme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: `"Grandstander", handwriting`,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontFamily: `"Grandstander", handwriting`,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: `"Itim", "Annie Use Your Telescope", "Mali", "Grandstander", handwriting`,
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
          color: "#118ab2",
        },
        h6: { color: "#118ab2" },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: `"Itim", "Annie Use Your Telescope", "Mali", "Grandstander", handwriting`,
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
          color: "#118ab2",
          fontSize: "large",
        },
        h6: { color: "#118ab2" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          fontFamily: `"Grandstander", handwriting`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          backgroundColor: "#f0ece2",
        },
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#ef476f",
    },
    secondary: {
      main: "#06d6a0",
    },
    info: {
      main: "#ffd166",
    },
    background: {
      default: "#118ab2",
    },
  },
});
