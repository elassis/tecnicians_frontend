import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyledNavbar } from "./NavbarStyles";
import { useNavigate } from "react-router-dom";
import { useDevice } from "../../common/hooks/useDevice";
import SideBar from "../../common/components/SideBar/SideBar";
import Link from "../../common/components/Link/Link";
import Button from "../../common/components/Button/Button";
import Text from "../../common/components/Text/Text";
import { SITE_TITLE } from "../../common/constants/titles";

function Navbar() {
  const user = useSelector((state) => state.user);
  const [defaultMargin, setDefaultMargin] = useState("-300px");
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
            onClick={() => setDefaultMargin("0px")}
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
              children={SITE_TITLE}
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
      {
        <SideBar
          marginLeft={defaultMargin}
          showSideBar={setDefaultMargin}
          urls={urls}
        />
      }
    </>
  );
}

export default Navbar;
