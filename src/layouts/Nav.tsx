import {
  Box,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  Drawer,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { IconLogout } from "@tabler/icons-react";
import navConfig from "./navConfig";
import { FC } from "react";
import { useAuth } from "../modules/auth/hooks/useAuth";

const drawerWidth = 240;

// Custom styled list item for navigation
const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface NavItemProps {
  item: {
    title: string;
    path: string;
    icon: JSX.Element;
  };
  onClick: (path: string) => void;
}

const NavItem: FC<NavItemProps> = ({ item, onClick }) => {
  const { icon, title, path } = item;

  return (
    <StyledListItem onClick={() => onClick(path)}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </StyledListItem>
  );
};

const Nav: FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* App Title */}
        <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
          <Typography variant="h6" noWrap>
            Entities Administrator
          </Typography>
        </Box>

        {/* Navigation Menu */}
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} onClick={handleItemClick} />
        ))}

        {/* Divider */}
        <Divider sx={{ marginTop: "auto" }} />

        {/* Logout Button */}
        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<IconLogout />}
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Nav;
