import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";

const bgGradient = ({
  color = "transparent",
  startColor,
  endColor,
  direction = "to bottom",
}: {
  color?: string;
  startColor: string;
  endColor: string;
  direction?: string;
}) => ({
  background: `linear-gradient(${direction}, ${startColor}, ${endColor}), ${color}`,
});

export const LoginPage = () => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();

  const handleLogin = () => {
    if (!email || !password) return;
    login(email, password);
  };

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          startColor: "#000024",
          endColor: "#2D3051",
          direction: "to bottom",
        }),
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      >
        <Typography variant="h5" sx={{ color: "white" }}>
          Business Administrator
        </Typography>
      </Box>

      <Box
        component="form"
        sx={{
          width: 300,
          padding: 4,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          borderRadius: "8px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3, color: theme.palette.text.primary }}
        >
          Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          sx={{ mb: 2, width: "100%" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          sx={{ mb: 2, width: "100%" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={loading}
          sx={{ width: "100%" }}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Box>
    </Box>
  );
};
