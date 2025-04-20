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
// import { supabase } from "../../supabaseClient"; // ← yangi import
import { useEffect } from "react"; // ← useEffect ham kerak bo‘ladi

import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // 👈 Routerdan navigate olish
import { supabase } from "../supabaseClient";

const drawerWidth = 240;

const allData = [
  {
    id: 1,
    title: "Allohning Habibi Muhammad 1-fasl",
    type: "multfilm",
    img: "../src/images/Allohning-Habibi-Muhammad-1.png",
  },
  {
    id: 2,
    title: "Allohning Habibi Muhammad 2-fasl",
    type: "multfilm",
    img: "../src/images/Allohning-Habibi-Muhammad-2.png",
  },
  {
    id: 3,
    title: "Allohning Habibi Muhammad 3-fasl",
    type: "multfilm",
    img: "../src/images/Allohning-Habibi-Muhammad-3.png",
  },
  {
    id: 4,
    title: "Qur'onda nomi kelgan jonzotlar",
    type: "multfilm",
    img: "../src/images/Qur'onda-nomi-kelgan-jonzotlar.png",
  },
  {
    id: 5,
    title: "Qur'onda kelgan ayollar qissasi",
    type: "multfilm",
    img: "../src/images/Qur'onda-kelgan-ayollar-qissasi.png",
  },
  {
    id: 6,
    title: "Qur'onda zikri kelgan ajoyibotlar",
    type: "multfilm",
    img: "../src/images/Qur'onda-zikri-kelgan-ajoyibotlar.png",
  },

  {
    id: 7,
    title: "Qur'onda kelgan insonlar qissasi",
    type: "multfilm",
    img: "../src/images/Qur'onda-kelgan-insonlar-qissasi.png",
  },
  {
    id: 8,
    title: "Qur'onda kelgan oyat-belgilar haqida qissalar",
    type: "multfilm",
    img: "../src/images/Qur'onda-kelgan-oyat-belgilar-haqida-qissalar.png",
  },
  {
    id: 9,
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

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("title", { ascending: true }); // yoki istalgan tartib

      if (error) {
        console.error("Error fetching videos:", error.message);
      } else {
        setAllData(data);
      }
    };

    fetchVideos();
  }, []);

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
          <Typography
            variant="h6"
            noWrap
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Islomiy Media
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
            <Card
              key={item.id}
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/playlist/${item.id}`)} // 👈 MUHIM!
            >
              <CardMedia.AccountCircle
                component="img"
                height="180"
                image={item.img}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="subtitle1">
                  {item.playlist_name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
