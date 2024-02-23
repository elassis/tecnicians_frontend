import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyledNavbar } from "./NavbarStyles";
import { useNavigate } from "react-router-dom";
import { useDevice } from "../../common/hooks/useDevice";
import SideBar from "../../common/components/SideBar/SideBar";
import Link from "../../common/components/Link/Link";
import Button from "../../common/components/Button/Button";
import Text from "../../common/components/Text/Text";

function Navbar() {
  const user = useSelector((state) => state.user);
  const [showSideBar, setShowSideBar] = useState(false);
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

  const urls = {
    loginUrl: "/login",
    signUpUrl: "/signUp",
  };

  return (
    <>
      <StyledNavbar>
        {isMobile && (
          <div
            className="hamburger-icon"
            onClick={() => setShowSideBar(!showSideBar)}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        {!isMobile && (
          <div className="desktop-layout">
            <Text
              className="header"
              weight={"700"}
              textColor={"#ffffff"}
              children={"Technicians Freelance"}
            />
            <div className="action-buttons">
              <Link url={"/signup"} children={"Signup"} />
              <Link url={"/login"} children={"Login"} />
            </div>
          </div>
        )}
        {document.cookie.includes("user_email") && (
          <>
            <div>
              <Button callBack={logOut} children={"Logout"} />
            </div>
            <div>
              <Link url={`/jobs/${user.id}`} children={"jobs"} />
            </div>
          </>
        )}
      </StyledNavbar>
      {<SideBar marginLeft={showSideBar ? '0px' : '-300px'} urls={urls} />}
    </>
  );
}

export default Navbar;
