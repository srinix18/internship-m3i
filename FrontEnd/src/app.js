import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OnboardingForm from "./components/OnboardingForm";
import ThankYou from "./components/Thankyou";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OnboardingForm />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
