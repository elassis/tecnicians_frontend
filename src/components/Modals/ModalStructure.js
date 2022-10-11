import React from "react";
import "./styling.css";
import { showModal } from "../../redux/slices/Modals/modalSlice";
import { useDispatch, useSelector } from "react-redux";

const ModalStructure = ({ children }) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.showModal);

  return (
    <div className={show ? "container-block" : "container-none"}>
      <div className="form">{children}</div>
      <button onClick={() => dispatch(showModal(false))}>X</button>
    </div>
  );
};

export default ModalStructure;
