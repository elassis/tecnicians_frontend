import React from "react";
import { StyledAvatar } from "./AvatarStyles";
import logo from "../../../assets/logo.svg"

const Avatar = (props) => {

  const {src, ...rest} = props;
  
  return (
    <StyledAvatar src={src || logo} {...rest}  />
  )
}

export default Avatar;