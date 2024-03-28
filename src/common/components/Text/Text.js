import React from "react";
import PropTypes from "prop-types";
import { StyledText } from "./TextStyles";

function Text({ children, size, weight, textColor, style, className }) {
  return (
    <StyledText size={size} className={className} style={style} $weight={weight} $textColor={textColor}>
      {children}
    </StyledText>
  );
}

Text.propTypes = {
  children: PropTypes.any.isRequired,
  size: PropTypes.string,
  weight: PropTypes.string,
  textcolor:PropTypes.string,
  style:PropTypes.object,
  className: PropTypes.string,
};

Text.defaultProps = {
  size: "14px",
  weight: "400",
  textcolor:"#000000",
  style:{},
  className:null,
};

export default Text;
