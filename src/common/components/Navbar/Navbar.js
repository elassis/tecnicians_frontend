import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledNavbar } from "./NavbarStyles";
import { useNavigate } from "react-router-dom";
import { useDevice } from "../../hooks/useDevice";
import SideBar from "../SideBar/SideBar";
import Link from "../Link/Link";
import Button from "../Button/Button";
import Text from "../Text/Text";
import { SITE_TITLE } from "../../constants/titles";
import { logout } from "./NavbarActions";

function Navbar() {
  const user = useSelector((state) => state.user);
  const [defaultMargin, setDefaultMargin] = useState("-300px");
  const { isMobile } = useDevice();
  const navigate = useNavigate();

  const logOutHandler = () => {
    logout();
    navigate("/login");
  };

  const myProfileHandler = () => {
    navigate(`profile/${user.id}`);
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
            {!user.hasOwnProperty("id") && (
              <div className="action-buttons">
                <Link url={"/signup"} children={"Signup"} />
                <Link url={"/login"} children={"Login"} />
              </div>
            )}
            {document.cookie.includes("user_email") && (
              <>
                {!isMobile && (
                  <div className="action-buttons">
                    <Button
                      callBack={myProfileHandler}
                      children={"My Profile"}
                    />
                    <Button callBack={logOutHandler} children={"Logout"} />
                  </div>
                )}
              {/*   {user.type === "technician" && (
                  <div>
                    <Link url={`/jobs/${user.id}`} children={"jobs"} />
                  </div>
                )} */}
              </>
            )}
          </div>
        )}
      </StyledNavbar>
      {
        <SideBar
          urls={urls}
          logout={logOutHandler}
          myProfile={myProfileHandler}
          marginLeft={defaultMargin}
          showSideBar={setDefaultMargin}
        />
      }
    </>
  );
}

export default Navbar;
