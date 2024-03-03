import React from "react";
import PropTypes from "prop-types";
import { StyledContainer } from "./ContainerStyles";

function Container({children}){
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  )
}


Container.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Container;
