import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
  PersonAdd,
  Settings,
  Logout,
  Login,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";
import logo from "../../public/images/TOY WORLD.png";
import { useState } from "react";

const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

export const logoImport = importAll(
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="#808080"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color={shades.secondary[500]}
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAAAoCAYAAAAyhCJ1AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEemlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDIzLTAzLTI2PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPmNiMmZlMzI3LTkxNTUtNDI0Yi05NTY5LTIzYWRhNTk4YTQxZTwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5UT1kgV09STEQgLSAxPC9yZGY6bGk+CiAgIDwvcmRmOkFsdD4KICA8L2RjOnRpdGxlPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6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" />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <IconButton sx={{ color: "black" }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <PersonOutline />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => navigate("/login")}>
                <ListItemIcon>
                  <Login fontSize="small" />
                </ListItemIcon>
                Login
              </MenuItem>
              <MenuItem onClick={() => navigate("/")}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </IconButton>
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton sx={{ color: "black" }}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
