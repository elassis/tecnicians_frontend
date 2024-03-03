import React from "react";
import PropTypes from "prop-types";
import Select from "../Select/Select";
import Input from "../Input/Input";
import Text from "../Text/Text";
import { red100 } from "../../constants/colors";
import { StyledProfessionSelect } from "./ProfessionSelectStyles";

const forwardedProfessionSelect = React.forwardRef(ProfessionSelect);

function ProfessionSelect(
  {
    selectName,
    inputName,
    items,
    errors,
    placeholder,
    onClickAdd,
    onClickRemove,
    register,
    className,
  },
  ref
) {
  return (
    <div className={className}>
      <StyledProfessionSelect ref={ref}>
        <Select
          name={selectName}
          items={items}
          errors={null}
          className="profession-select"
          {...register(`${selectName}`, {
            required: true,
            pattern: {
              value: /^\d+$/,
            },
          })}
        />
        <Input
          name={inputName}
          placeholder={placeholder}
          items={items}
          errors={null}
          className="profession-input"
          {...register(`${inputName}`, {
            required: true,
          })}
        />
        <span
          data-testid="add-element"
          key={`plus_${selectName}`}
          onClick={onClickAdd}
        >
          +
        </span>
        <span key={`minus_${selectName}`} onClick={onClickRemove}>
          -
        </span>
      </StyledProfessionSelect>
      {errors && (errors[selectName] || errors[inputName]) && (
        <Text textColor={red100}>
          {"Must select a profession and write down the wage"}
        </Text>
      )}
    </div>
  );
}

ProfessionSelect.propTypes = {
  selectName: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onClickAdd: PropTypes.func,
  onClickRemove: PropTypes.func,
};

ProfessionSelect.defaultProps = {
  placeholder: null,
  onChange: null,
  onClickAdd: null,
  onClickRemove: null,
};

export default forwardedProfessionSelect;
