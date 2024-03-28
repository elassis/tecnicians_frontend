import React from "react";
import PropTypes from "prop-types";
import Text from "../Text/Text";
import { StyledCounter } from "./CounterStyles.js";

const Counter = ({count}) => {
  return (
    <StyledCounter>
      <Text>{count}</Text>
    </StyledCounter>
  )
}

Counter.propTypes = {
  count: PropTypes.number,
}

Counter.defaultProps = {
  count: 0,
}

export default Counter;