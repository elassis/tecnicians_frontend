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
      <button onClick={() => goTo("/signup")}>signup</button>
      <button onClick={() => goTo("/login")}>login</button>
    </div>
  );
};

export default LandingPage;
