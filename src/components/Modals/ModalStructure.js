import React from "react";
import "./styling.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ModalStructure = (props) => {
  const { children, reducer, action } = props;
  const dispatch = useDispatch();
  const show = useSelector(state => state.modals[`${reducer}`]);
  
  return (
    <div className={show ? "container-block" : "container-none"}>
      <div className="form">{children}</div>
      <button onClick={() => {dispatch(action(false))}}>X</button>
    </div>
  );
};

export default ModalStructure;
