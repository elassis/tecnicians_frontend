import React from "react";
import { useSelector } from "react-redux";
import { StyledNavbar } from "./NavbarStyles";
import { useNavigate } from "react-router-dom";
import { useDevice } from "../../common/hooks/useDevice";

function Navbar() {
  const user = useSelector((state) => state.user);
  const { isMobile } = useDevice();
  const navigate = useNavigate();
  const logOut = () => {
    document.cookie =
      "user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "laravel_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  return (
    <StyledNavbar>
      {isMobile && (
        <div className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      {!isMobile && (
        <div className="desktop-layout">
          <p className="header">Technicians Freelance</p>
          <div className="action-buttons">
            <button onClick={() => navigate("/signup")}>signup</button>
            <button onClick={() => navigate("/login")}>login</button>
          </div>
        </div>
      )}

      {document.cookie.includes("user_email") && (
        <>
          <div>
            <button onClick={logOut}>logout</button>
          </div>
          <div>
            <button onClick={() => navigate(`/jobs/${user.id}`)}>jobs</button>
          </div>
        </>
      )}
    </StyledNavbar>
  );
}

export default Navbar;
