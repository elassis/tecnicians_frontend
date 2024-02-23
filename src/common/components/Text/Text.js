import React from "react";
import PropTypes from "prop-types";
import { StyledText } from "./TextStyles";

function Text({ children, size, weight, textColor }) {
  return (
    <StyledText size={size} $weight={weight} $textColor={textColor}>
      {children}
    </StyledText>
  );
}

Text.propTypes = {
  children: PropTypes.string.isRequired,
  size: PropTypes.string,
  weight: PropTypes.string,
  textcolor:PropTypes.string,
};

Text.defaultProps = {
  size: "14px",
  weight: "400",
  textcolor:"#000000",
};

export default Text;
