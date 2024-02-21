import React from "react";

const Select = ({ items, name }) => {
  
  return (
    <select name={name}>
      {items.map((elem) => {
        return (
          <option key={elem.id} value={elem.id}>
            {elem.name}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
