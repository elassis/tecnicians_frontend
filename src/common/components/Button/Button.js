import React from "react";
import PropTypes from "prop-types";
import { StyledButton } from "./ButtonStyles";

function Button({ children, textColor, backgroundColor, callBack }) {
  return (
    <StyledButton
      onClick={callBack}
      $backgroundColor={backgroundColor}
      $textColor={textColor}
    >
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  callBack: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: "#00994c",
  textColor: "#ffffff",
  callBack: () => {},
};

export default Button;
