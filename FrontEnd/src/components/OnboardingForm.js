import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box, Card, CardContent, Typography, Button,
  TextField, MenuItem, InputLabel, FormControl, Select, Slider, Alert
} from "@mui/material";

const PROPERTY_TYPES = [
  "Apartment",
  "Plot",
  "Commercial",
  "Villa",
  "Farmhouse"
];

const indianMobileRegex = /^[6-9]\d{9}$/;
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

export default function OnboardingForm() {
  const [sliderRange, setSliderRange] = useState([100000, 10000000]);
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    city: "",
    propertyType: "",
    minBudget: 100000,
    maxBudget: 500000,
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitMsg, setSubmitMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/config").then((res) => {
      setSliderRange([res.data.sliderMin, res.data.sliderMax]);
      setForm((f) => ({
        ...f,
        minBudget: res.data.sliderMin,
        maxBudget: res.data.sliderMin * 5,
      }));
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSliderChange = (e, newValue) => {
    setForm((prev) => ({
      ...prev,
      minBudget: newValue[0],
      maxBudget: newValue[1],
    }));
    setErrors((prev) => ({ ...prev, minBudget: undefined }));
  };

  const validate = () => {
    const minValue = sliderRange[0];
    const maxValue = sliderRange[1];
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full Name is required";
    if (!indianMobileRegex.test(form.mobile))
      errs.mobile = "Valid 10-digit Indian number required";
    if (!emailRegex.test(form.email)) errs.email = "Valid email required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.propertyType) errs.propertyType = "Select a property type";
    if (
      typeof form.minBudget !== "number" ||
      typeof form.maxBudget !== "number" ||
      form.minBudget < minValue ||
      form.maxBudget < minValue ||
      form.minBudget > maxValue ||
      form.maxBudget > maxValue ||
      form.minBudget > form.maxBudget
    ) {
      errs.minBudget = "Please choose a valid budget range.";
    }
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMsg("");
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const submission = {
      ...form,
      minBudget: Number(form.minBudget),
      maxBudget: Number(form.maxBudget),
    };
    try {
      await axios.post("http://localhost:5000/api/customers", submission);
      navigate("/thank-you");
    } catch (err) {
      setSubmitMsg(err.response?.data?.error || "Submission failed.");
    }
  };

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
          p: { xs: 2, md: 4 },
          mx: 2,
          width: { xs: "100%", sm: 450 },
          boxShadow: 14,
          backdropFilter: "blur(12px)",
        }}
      >
        <Card elevation={0} sx={{ bgcolor: "transparent" }}>
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              fontWeight={800}
              color="black"
              gutterBottom
            >
              Customer Onboarding
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: "100%" }}>
              <TextField
                fullWidth required label="Full Name"
                InputLabelProps={{ style: { color: "#111" } }}
                inputProps={{ style: { color: "#222" } }}
                name="fullName" value={form.fullName}
                onChange={handleChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
                margin="normal"
                autoComplete="off"
              />
              <TextField
                fullWidth required label="Mobile Number"
                InputLabelProps={{ style: { color: "#111" } }}
                inputProps={{ style: { color: "#222" } }}
                name="mobile" value={form.mobile}
                onChange={handleChange}
                error={!!errors.mobile}
                helperText={errors.mobile}
                margin="normal"
                autoComplete="off"
              />
              <TextField
                fullWidth required label="Email"
                InputLabelProps={{ style: { color: "#111" } }}
                inputProps={{ style: { color: "#222" } }}
                name="email" value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
                type="email"
                autoComplete="off"
              />
              <TextField
                fullWidth required label="City of Interest"
                InputLabelProps={{ style: { color: "#111" } }}
                inputProps={{ style: { color: "#222" } }}
                name="city" value={form.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city}
                margin="normal"
                autoComplete="off"
              />
              <FormControl fullWidth required margin="normal" error={!!errors.propertyType}>
                <InputLabel style={{ color: "#111" }}>Type of Property</InputLabel>
                <Select
                  name="propertyType"
                  value={form.propertyType}
                  label="Type of Property"
                  onChange={handleChange}
                  sx={{ color: "#222" }}
                >
                  <MenuItem value="">--Select--</MenuItem>
                  {PROPERTY_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
                {errors.propertyType &&
                  <Typography color="error" variant="caption">{errors.propertyType}</Typography>
                }
              </FormControl>
              <Box mt={2} mb={1} fontWeight={600} color="black">
                Budget Range
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={-1}>
                <Typography color="black">₹{parseInt(form.minBudget).toLocaleString()}</Typography>
                <Typography color="black">–</Typography>
                <Typography color="black">₹{parseInt(form.maxBudget).toLocaleString()}</Typography>
              </Box>
              <Slider
                value={[Number(form.minBudget), Number(form.maxBudget)]}
                min={sliderRange[0]}
                max={sliderRange[1]}
                step={10000}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                sx={{
                  color: "#ed6f1b",
                  mb: 2,
                  mt: 1,
                }}
              />
              {errors.minBudget &&
                <Typography color="error" variant="caption" display="block" mb={1}>{errors.minBudget}</Typography>
              }
              <TextField
                fullWidth
                required
                multiline
                rows={3}
                label="Message / Comments"
                name="message"
                InputLabelProps={{ style: { color: "#111" } }}
                inputProps={{ style: { color: "#222" } }}
                value={form.message}
                onChange={handleChange}
                error={!!errors.message}
                helperText={errors.message}
                margin="normal"
              />
              <Button
                fullWidth
                type="submit"
                size="large"
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: "#ff7900",
                  ":hover": {
                    bgcolor: "#e45300",
                    background: "linear-gradient(90deg, #ff7900 60%, #ed335d 100%)"
                  },
                  borderRadius: 2,
                  fontWeight: "bold",
                  boxShadow: 3,
                  textTransform: "none",
                  fontSize: "1.2rem"
                }}
              >
                Submit
              </Button>
              {submitMsg && (
                <Alert severity="success" sx={{ mt: 2, fontWeight: "bold", color: "#222" }}>
                  {submitMsg}
                </Alert>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
