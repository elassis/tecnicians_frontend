import React from "react";
import PropTypes from "prop-types";
import { StyledSideBar } from "./SideBarStyles";
import Link from "../Link/Link";
import Button from "../Button/Button";
import Text from "../Text/Text";
import { SITE_TITLE } from "../../constants/titles";

function SideBar({ urls, marginLeft, showSideBar }) {
  const { loginUrl, signUpUrl } = urls;
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
        <Link url={signUpUrl} children={"Sign up"} />
        <Link url={loginUrl} children={"Login"} />
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
