import React from "react";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
  const navigate = useNavigate()
  const goToSignup = () => {
    navigate('/signup');
  }
  return (
      <div>
           <h1>This is the Landing</h1>
          <button onClick={goToSignup}>signup</button>
      </div>

  )
}

export default LandingPage;