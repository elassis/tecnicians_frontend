import React from "react";
import { StyledInput } from "./InputStyles";
import PropTypes from "prop-types";
import Text from "../Text/Text";
import { red100 } from "../../constants/colors";

const forwardedInput = React.forwardRef(Input);

function Input({ type, checked, name, control, placeholder, errors, onChange, onClick, className }, ref) {
  return (
    <div className={className}>
      <StyledInput
        ref={ref}
        control={control}
        type={type}
        name={name}
        checked={checked}
        onClick={onClick}
        onChange={onChange}
        placeholder={placeholder}
      />
      {errors && errors[name] && (
        <Text textColor={red100}>
          {errors[name].message || "This field is required"}
        </Text>
      )}
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  ref: PropTypes.string,
  control: PropTypes.any,
};

Input.defaultProps = {
  type: "text",
  placeholder: null,
  onChange: null,
  onClick: null,
  ref: null,
  control: null,
};

export default forwardedInput;
