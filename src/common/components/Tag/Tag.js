import React from "react";
import PropTypes from "prop-types";
import { StyledTag } from "./TagStyles";
import { green50 } from "../../constants/colors";

const Tag = ({children, backgroundColor, className}) => {
  return (
    <StyledTag className={className} backgroundColor={backgroundColor}>{children}</StyledTag>
  )
};

Tag.propTypes = {
  children: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
}

Tag.defaultProps = {
  backgroundColor: green50,
  className: null,
}

export default Tag;

