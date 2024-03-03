import React from "react";
import { StyledSelect } from "./SelectStyles";
import Text from "../Text/Text";
import { red100 } from "../../constants/colors";

const forwardedSelect = React.forwardRef(Select);

function Select({ items, name, onChange, errors, className }, ref){
  return (
    <div className={className}>
      <StyledSelect ref={ref} onChange={onChange} name={name}>
        {items.map((elem) => {
          return (
            <option key={elem.id} value={elem.id}>
              {elem.name}
            </option>
          );
        })}
      </StyledSelect>
      {errors && errors[name] && (
        <Text textColor={red100}>
          {errors[name].message || "This field is required"}
        </Text>
      )}
    </div>
  );
};

export default forwardedSelect;
