import React from "react";
import PropTypes from "prop-types";
import Text from "../Text/Text";
import { red100 } from "../../constants/colors";
import { StyledTextarea } from "./TextareaStyles";

const forwardedTextarea = React.forwardRef(Textarea);

function Textarea(
  {
    type,
    value,
    disabled,
    checked,
    name,
    control,
    placeholder,
    errors,
    onChange,
    onClick,
    className,
  },
  ref
) {
  return (
    <div className={className}>
      <StyledTextarea
        ref={ref}
        value={value}
        control={control}
        type={type}
        name={name}
        checked={checked}
        onClick={onClick}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      {errors && errors[name] && (
        <Text textColor={red100}>
          {errors[name].message || "This field is required"}
        </Text>
      )}
    </div>
  );
}

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  ref: PropTypes.string,
  control: PropTypes.any,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

Textarea.defaultProps = {
  type: "text",
  placeholder: null,
  onChange: null,
  onClick: null,
  ref: null,
  control: null,
  value: null,
  disabled: false,
};

export default forwardedTextarea;
