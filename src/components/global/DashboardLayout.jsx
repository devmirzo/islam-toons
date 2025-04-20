import React, { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Movie as MovieIcon,
  LibraryMusic as LibraryMusicIcon,
  MenuBook as MenuBookIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // 👈 Routerdan navigate olish

const drawerWidth = 240;

const allData = [
  {
    id: 1,
    title: "Yusuf A.S",
    type: "multfilm",
    img: "https://placekitten.com/200/300",
  },
  {
    id: 2,
    title: "Imon haqiqatlari",
    type: "hujjatli",
    img: "https://placekitten.com/201/300",
  },
  {
    id: 3,
    title: "Odob haqida",
    type: "audio",
    img: "https://placekitten.com/202/300",
  },
  {
    id: 4,
    title: "Soliha ayol",
    type: "audio",
    img: "https://placekitten.com/203/300",
  },
  {
    id: 5,
    title: "Payg‘ambarlar qissasi",
    type: "multfilm",
    img: "https://placekitten.com/204/300",
  },
  {
    id: 6,
    title: "Musulmon olam tarixi",
    type: "hujjatli",
    img: "https://placekitten.com/205/300",
  },
];

export default function DashboardLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate(); // 👈 navigate hooki

  const [selected, setSelected] = useState("all");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 👈 Bu holatni autentifikatsiyaga bog‘lash mumkin
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = { name: "humoyunmirzo@gmail.com" };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSelect = (value) => {
    setSelected(value);
    if (isMobile) setMobileOpen(false);
  };

  const filteredData =
    selected === "all"
      ? allData
      : allData.filter((item) => item.type === selected);

  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Toolbar />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={selected === "multfilm"}
              onClick={() => handleSelect("multfilm")}
            >
              <ListItemIcon>
                <MovieIcon />
              </ListItemIcon>
              <ListItemText primary="Multfilmlar" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selected === "hujjatli"}
              onClick={() => handleSelect("hujjatli")}
            >
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Hujjatli Filmlar" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selected === "audio"}
              onClick={() => handleSelect("audio")}
            >
              <ListItemIcon>
                <LibraryMusicIcon />
              </ListItemIcon>
              <ListItemText primary="Audio Kitoblar" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              selected={selected === "all"}
              onClick={() => handleSelect("all")}
            >
              <ListItemText primary="Barchasini ko‘rish" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Box sx={{ p: 2, borderTop: "1px solid #ccc" }}>
        {isLoggedIn ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
            onClick={() => navigate("/user")}
          >
            <AccountCircleIcon />
            <Typography variant="body2" noWrap>
              {user.name}
            </Typography>
          </Box>
        ) : (
          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            Islomiy Video & Audio Platforma
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography variant="h5" gutterBottom>
          {selected === "all"
            ? "Barcha materiallar"
            : selected.charAt(0).toUpperCase() + selected.slice(1) + " bo‘limi"}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
          }}
        >
          {filteredData.map((item) => (
            <Card key={item.id}>
              <CardMedia
                component="img"
                height="140"
                image={item.img}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="subtitle1">{item.title}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
