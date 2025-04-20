import React from "react";
import { Box, Avatar, Typography, Card, CardContent } from "@mui/material";

const User = () => {
  // 🔐 Bu ma’lumotlar odatda autentifikatsiyadan olinadi
  const user = {
    name: "Humoyun Mirzo",
    email: "humoyunmirzo@gmail.com",
    photoURL: "https://lh3.googleusercontent.com/a/default-user=s96-c", // Gmail default avatar
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 10,
        px: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", textAlign: "center", p: 2 }}>
        <Avatar
          alt={user.name}
          src={user.photoURL}
          sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
        />
        <CardContent>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default User;
