import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../services/auth/authSlice";
import { useSelector } from "react-redux";

const drawerWidth = 240;
const navItems = [
  { label: "Dashboard", path: "/" },

  { label: "Buses", path: "/buses" },
  { label: "Companies", path: "/companies" },
  { label: "Trips", path: "/trips" },
  { label: "Tickets", path: "/tickets" },
];

const mobileStyle = {
  textDecoration: "none",
  padding: "10px 0",
  fontSize: "18px",
  fontWeight: "550",
};

const style = {
  textDecoration: "none",
  fontSize: "18px",
  margin: "0 10px",
};

function NavBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Basiru Buses
      </Typography>
      <Divider />
      <Box display={"flex"} flexDirection={"column"} paddingTop={2}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            style={({ isActive, isPending }) => {
              return {
                ...mobileStyle,
                backgroundColor: isActive
                  ? "#011627"
                  : isPending
                  ? "#f57c00"
                  : "#14213d",
                display:
                  user.role === "client" &&
                  (item.label === "Dashboard" ||
                    item.label === "Buses" ||
                    item.label === "Companies")
                    ? "none"
                    : "block",
              };
            }}
            to={item.path}
          >
            {item.label}
          </NavLink>
        ))}
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {user.role !== "client" && ( // Hide navbar for client
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box display={"flex"} width={"100%"} alignItems={"center"}>
              <Typography
                variant="h6"
                component="div"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                Basiru Buses
              </Typography>
              <Box sx={{ display: { xs: "none", md: "block" }, marginLeft: 8 }}>
                {navItems.map((item) => {
                  if (
                    !(user.role === "admin" && item.label === "Buses") &&
                    !(user.role === "admin" && item.label === "Tickets") &&
                    !(user.role === "company" && item.label === "Companies") &&
                    !(user.role === "admin" && item.label === "Trips")
                  ) {
                    return (
                      <NavLink
                        key={item.path}
                        style={({ isActive, isPending }) => {
                          return {
                            ...style,
                            borderBottom: isActive
                              ? "solid 3px white"
                              : isPending
                              ? "#f57c00"
                              : "",
                            color: "white",
                            padding: "8px",
                            display:
                              user.role === "client" &&
                              (item.label === "Dashboard" ||
                                item.label === "Buses" ||
                                item.label === "Companies")
                                ? "none"
                                : "",
                          };
                        }}
                        to={item.path}
                      >
                        {item.label}
                      </NavLink>
                    );
                  }
                  return null;
                })}
              </Box>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                sx={{ marginLeft: "auto" }}
                onClick={handleLogout}
              >
                <LogoutIcon />
                <Typography>Logout</Typography>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      )}
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default NavBar;
