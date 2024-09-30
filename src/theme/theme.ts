import { createTheme, alpha } from "@mui/material/styles";

const grey = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#E4E4E4",
  300: "#C4C4C4",
  400: "#A4A4A4",
  500: "#848484",
  600: "#636363",
  700: "#424242",
  800: "#212121",
  900: "#161616",
};

const primary = {
  main: "#0D47A1",
  contrastText: "#FFFFFF",
};

const secondary = {
  main: "#FFC107",
  contrastText: "#FFFFFF",
};

const success = {
  main: "#1E88E5", // Azul claro que complementa el primary
  contrastText: "#FFFFFF",
};

const warning = {
  main: "#FFA726",
  contrastText: "#FFFFFF",
};

const error = {
  main: "#D32F2F",
  contrastText: "#FFFFFF",
};

const info = {
  main: "#1976D2",
  contrastText: "#FFFFFF",
};

const theme = createTheme({
  palette: {
    primary,
    secondary,
    success,
    warning,
    error,
    info,
    grey,
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
    text: {
      primary: grey[800],
      secondary: grey[600],
      disabled: grey[500],
    },
    background: {
      paper: "#FFFFFF",
      default: grey[100],
    },
    action: {
      hover: alpha(grey[500], 0.08),
      selected: alpha(grey[500], 0.16),
      disabled: alpha(grey[500], 0.5),
      disabledBackground: alpha(grey[500], 0.24),
      active: grey[600],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          padding: "8px 16px",
          boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#1565C0", // Azul más oscuro al hacer hover
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: grey[300],
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: primary.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: primary.main,
          },
        },
      },
    },
  },
});

export default theme;
