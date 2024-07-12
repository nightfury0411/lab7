import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useThemeChange } from "../components/customhook/useChangeTheme";
import { useOath } from "../components/customhook/useAouth";

const Header = () => {
  const navigate = useNavigate();
  const changeTheme = useThemeChange();
  const oath = useOath();
  const { login, handleLogout, user } = oath;
  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: "#fff",
          color: "#000",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ alignItems: "center", display: "flex" }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                borderRadius: "50%",
              }}
              onClick={() => {
                navigate("/");
              }}
              style={{ cursor: "pointer" }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl1NBjHAGPLuj2v39hJSNauCTv4KyavUHhGA&s"
                alt="chorid"
                style={{
                  width: "80px",
                  height: "80px",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              />
            </Box>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            {user.role === "user" && (
              <>
                <Button color="inherit" component={Link} to="/news">
                  News
                </Button>
                <Button color="inherit" component={Link} to="/about">
                  About
                </Button>
                <Button color="inherit" component={Link} to="/contact">
                  Contact
                </Button>
              </>
            )}
            {user.role === "admin" && (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/admin/orchid-management"
                >
                  Orchids Management
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/admin/user-management"
                >
                  User Management
                </Button>
              </>
            )}
          </Box>
          {!login ? (
            <Button
              variant="contained"
              component={Link}
              to="/login"
              style={{ backgroundColor: "rgb(102, 59, 45)" }}
            >
              Login
            </Button>
          ) : (
            <Button variant="outlined" onClick={handleLogout}>
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Button
        sx={{
          position: "fixed",
          bgcolor: "#663b2d",
          borderRadius: "20px",
          width: "140px",
          height: "60px",
          bottom: "60px",
          color: "#fff",
          right: "20px",
          fontSize: "12px",
          "&:hover": {
            bgcolor: "#663b2d",
          },
        }}
        onClick={changeTheme}
      >
        Toggle theme
      </Button>
    </>
  );
};

export default Header;
