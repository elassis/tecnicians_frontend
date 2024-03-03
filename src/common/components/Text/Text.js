import React from "react";
import PropTypes from "prop-types";
import { StyledText } from "./TextStyles";

function Text({ children, size, weight, textColor, style }) {
  return (
    <StyledText size={size} style={style} $weight={weight} $textColor={textColor}>
      {children}
    </StyledText>
  );
}

Text.propTypes = {
  children: PropTypes.string.isRequired,
  size: PropTypes.string,
  weight: PropTypes.string,
  textcolor:PropTypes.string,
  style:PropTypes.object,
};

Text.defaultProps = {
  size: "14px",
  weight: "400",
  textcolor:"#000000",
  style:{},
};

export default Text;
