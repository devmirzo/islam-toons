import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Parollar mos emas!");
      return;
    }

    console.log("Ro‘yxatdan o‘tish:", formData);
    // 🔐 Auth logikasini shu yerga yozasiz
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e0eafc, #cfdef3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 450,
          width: "100%",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" textAlign="center" fontWeight="bold" mb={2}>
          Ro‘yxatdan o‘tish
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Ism"
            name="name"
            fullWidth
            margin="normal"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            required
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Parol"
            name="password"
            fullWidth
            margin="normal"
            required
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Parolni tasdiqlash"
            name="confirmPassword"
            fullWidth
            margin="normal"
            required
            type={showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1.2 }}
          >
            Ro‘yxatdan o‘tish
          </Button>

          <Typography variant="body2" textAlign="center" mt={2}>
            Akkountingiz bormi?{" "}
            <Link href="/login" underline="hover">
              Kirish
            </Link>
          </Typography>
        </form>{" "}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            variant="outlined"
            fullWidth
            sx={{ width: "100%" }}
            // onClick={handleGoogleLogin}
          >
            Google orqali ro‘yxatdan o‘tish
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
