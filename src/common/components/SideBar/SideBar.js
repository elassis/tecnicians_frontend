import React from "react";
import PropTypes from "prop-types";
import { StyledSideBar } from "./SideBarStyles";
import Link from "../Link/Link";
import Button from "../Button/Button";
import Text from "../Text/Text";
import { SITE_TITLE } from "../../constants/titles";
import { useSelector } from "react-redux";

function SideBar({ urls, marginLeft, showSideBar, logout, myProfile }) {
  const { loginUrl, signUpUrl } = urls;
  const { user } = useSelector((state) => state);

  return (
    <StyledSideBar $marginLeft={marginLeft}>
      <div className="sidebar-header">
        <Text children={SITE_TITLE} size={"20px"} weight={"700"} />
        <Button
          backgroundColor={"#ffffff"}
          textColor={"#000000"}
          callBack={() => showSideBar("-300px")}
          children={"X"}
        />
      </div>
      <div className="buttons-section">
        {!user.hasOwnProperty("id") && (
          <>
            <Link url={signUpUrl} children={"Sign up"} />
            <Link url={loginUrl} children={"Login"} />
            <Button callBack={logout}>Logout</Button>
          </>
        )}
        {user && user.hasOwnProperty("id") && (
          <>
            <Button callBack={logout}>Logout</Button>
            <Button callBack={myProfile}>My profile</Button>
          </>
        )}
      </div>
    </StyledSideBar>
  );
}

SideBar.propTypes = {
  urls: PropTypes.object.isRequired,
  marginLeft: PropTypes.string,
};

SideBar.defaultProps = {
  marginLeft: "-300px",
};

export default SideBar;
