import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function ThankYou() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(120deg, #a259ec 0%, #ed335d 40%, #fff 75%, #fff 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        p: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: "rgba(255,255,255,0.94)",
          borderRadius: 8,
          p: { xs: 3, md: 5 },
          mx: 2,
          width: { xs: "100%", sm: 420 },
          boxShadow: 14,
          backdropFilter: "blur(12px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Card elevation={0} sx={{ bgcolor: "transparent", width: "100%" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <EmojiEventsIcon
              sx={{
                fontSize: 62,
                color: "#ff7900",
                mb: 1.5,
                filter: "drop-shadow(0px 4px 12px #ed335d55)"
              }}
            />
            <Typography
              variant="h3"
              fontWeight={800}
              color="black"
              gutterBottom
              sx={{
                letterSpacing: 0.5,
                mt: 1,
                mb: 1,
                fontSize: { xs: "2rem", sm: "2.4rem" }
              }}
            >
              Thank You!
            </Typography>
            <Typography
              variant="h6"
              color="black"
              sx={{ mb: 2, maxWidth: "90%", mx: "auto" }}
            >
              Your information has been submitted successfully.<br />
              We will get back to you shortly.
            </Typography>
            <Button
              href="/"
              sx={{
                mt: 3,
                px: 5,
                py: 1.5,
                bgcolor: "#ff7900",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.1rem",
                borderRadius: 2,
                boxShadow: 3,
                ":hover": {
                  bgcolor: "#e45300",
                  background: "linear-gradient(90deg, #ff7900 60%, #ed335d 100%)"
                },
                textTransform: "none"
              }}
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
