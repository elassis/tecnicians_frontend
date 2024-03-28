import React from "react";
import PropTypes from "prop-types";
import { StyledButton } from "./ButtonStyles";

function Button({
  icon,
  children,
  textColor,
  className,
  backgroundColor,
  callBack,
}) {
  return (
    <StyledButton
      onClick={callBack}
      className={className}
      $backgroundColor={backgroundColor}
      $textColor={textColor}
    >
      {icon !== null ? (
        <>
          {" "}
          {children}
          {icon}{" "}
        </>
      ) : (
        <>{children}</>
      )}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  callBack: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.any,
};

Button.defaultProps = {
  backgroundColor: "#00994c",
  textColor: "#ffffff",
  callBack: () => {},
  className: null,
  icon: null,
};

export default Button;
