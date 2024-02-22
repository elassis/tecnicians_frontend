import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const goTo = (url) => {
    navigate(url);
  };
  return (
    <div>
      <h1>This is the Landing</h1>      
    </div>
  );
};

export default LandingPage;
