import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const MainLayout: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "grey.100",
      }}
    >
      <Nav />
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
