import React from "react";
import PropTypes from "prop-types";
import { StyledLink } from "./LinkStyles";

function Link({ url, children }){
  return <StyledLink href={url}>{children}</StyledLink>;
};

Link.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Link;
