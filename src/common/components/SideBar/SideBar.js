import React, { useState } from "react";
import PropTypes from "prop-types";
import { StyledSideBar } from "./SideBarStyles";
import Link from "../Link/Link";
import Button from "../Button/Button";
import Text from "../Text/Text";
import { SITE_TITLE } from "../../constants/titles";

function SideBar({ urls, marginLeft }) {
  const { loginUrl, signUpUrl } = urls;
  const [newMargin, setNewMargin] = useState('0');
  return (
    <StyledSideBar $marginLeft={newMargin !== '0' ? newMargin : marginLeft}>
      <div className="sidebar-header">
        <Text children={SITE_TITLE} size={'20px'} weight={'700'}/>
        <Button
          backgroundColor={"#ffffff"}
          textColor={"#000000"}
          callBack={() => setNewMargin('-300px')}
          children={"X"}
        />
      </div>
      <div>
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
