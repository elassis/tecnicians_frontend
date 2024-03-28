import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Select from "../Select/Select";
import Input from "../Input/Input";
import Text from "../Text/Text";
import { red100 } from "../../constants/colors";
import { StyledProfessionSelect } from "./ProfessionSelectStyles";
import { setSelectAmount } from "../../../redux/slices/SignUp/signUpSlice";
import { defaultOption } from "../../utils";

const forwardedProfessionSelect = React.forwardRef(ProfessionSelect);

function ProfessionSelect(
  {
    selectName,
    inputName,
    items,
    errors,
    placeholder,
    register,
    className,
    unregister,
    id,
  },
  ref
) {
  const { selectAmount } = useSelector((state) => state.signUp);
  const dispatch = useDispatch();

  //delete element from form's state
  const removeFromFormState = (elem) => {
    unregister(elem.selectName);
    unregister(elem.inputName);
  };

  const addRemoveSelect = (type, id = null) => {
    let newState = [];
    let currentIndex = Math.floor(Math.random() * 100);
    if (type === "add") {
      const professionObj = {
        id: currentIndex,
        selectName: `profession_${currentIndex}`,
        selectedValue: null,
        inputName: `price_profession_${currentIndex}`,
        inputValue: null,
      };
      newState = [...selectAmount, professionObj];
    }
    if (type === "minus" && id !== null) {
      const professionToRemove = selectAmount.filter((prof) => prof.id === id);
      const updatedState = selectAmount.filter(
        (prof) => prof.id !== professionToRemove[0].id
      );

      removeFromFormState(professionToRemove[0]);

      newState = updatedState.length > 0 ? [...updatedState] : [];
    }
    if (type === "remove") {
      selectAmount.forEach((elem) => removeFromFormState(elem));
      newState = [];
    }
    dispatch(setSelectAmount(newState));
  };

  return (
    <div className={className}>
      <StyledProfessionSelect ref={ref}>
        <Select
          name={selectName}
          items={[defaultOption, ...items]}
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
          errors={null}
          className="profession-input"
          {...register(`${inputName}`, {
            required: true,
          })}
        />
        <span
          data-testid="add-element"
          key={`plus_${selectName}`}
          onClick={() => addRemoveSelect("add")}
        >
          +
        </span>
        <span
          key={`minus_${selectName}`}
          onClick={() => addRemoveSelect("minus", id)}
        >
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
  register: PropTypes.any,
};

ProfessionSelect.defaultProps = {
  placeholder: null,
  onChange: null,
  onClickAdd: null,
  onClickRemove: null,
  register: null,
};

export default forwardedProfessionSelect;
