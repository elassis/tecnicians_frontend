import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tag from "../../../common/components/Tag/Tag";
import { StyledEditProfessionsModal } from "./EditProfessionModalStyles";
import Button from "../../../common/components/Button/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setErrors } from "../../../redux/slices/Errors/errorsSlice";
import {
  DELETE_TECH_PROFESSION,
  SAVE_TECH_PROFESSION,
} from "../../../apis/techProfessionsApi";
import { deleteData, storeData } from "../../../apis/ApiActions";
import { fetchProfessions } from "../../../redux/slices/Profession/professionSlice";
import ProfessionSelect from "../../../common/components/ProfessionSelect/ProfessionSelect";
import { useForm } from "react-hook-form";
import { setSelectAmount } from "../../../redux/slices/SignUp/signUpSlice";
import { addProfessionSelect, formatPayload } from "../../../common/utils";
import { addTechnician } from "../../../redux/slices/Technician/technicianSlice";

const EditProfessionModal = ({ userProfessions }) => {
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [response, setResponse] = useState(null);
  const { selectAmount } = useSelector((state) => state.signUp);
  const { professions } = useSelector((state) => state.professions);
  const { user_info } = useSelector((state) => state.technician.tech.data.data);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchProfessions());
  }, []);

  useEffect(()=>{
    if(selectAmount.length > 0){
      dispatch(setSelectAmount([]));
    }
  },[response])

  const actions = {
    success: addTechnician,
    failure: setErrors,
    responseChange: setResponse,
  };

  const send = (data) => {
    const url = SAVE_TECH_PROFESSION;
    const payload = formatPayload(user_info.id, data);
    storeData(url, payload, dispatch, addTechnician);
  };

  const onClickHandler = (id) => {
    const url = DELETE_TECH_PROFESSION.replace("{id}", id);
    deleteData(url, dispatch, addTechnician);
  };

  return (
    <StyledEditProfessionsModal>
      {userProfessions &&
        userProfessions.length > 0 &&
        userProfessions.map((prof) => {
          return (
            <div className="profession-row" key={prof.id}>
              <Tag key={prof.id}>{`${prof.name} - ${prof.price}`}</Tag>
              <Button
                className={"edit_profession_button"}
                callBack={() => onClickHandler(prof.tp_id)}
              >
                Remove
              </Button>
            </div>
          );
        })}
      {selectAmount.length > 0 ? (
        <form onSubmit={handleSubmit(send)}>
          {professions.length > 0 &&
            selectAmount.map((item, index) => {
              return (
                <ProfessionSelect
                  id={item.id}
                  key={item.id}
                  errors={errors}
                  items={professions}
                  register={register}
                  className={"select"}
                  unregister={unregister}
                  inputName={item.inputName}
                  selectName={item.selectName}
                />
              );
            })}
          <Button className={"edit_profession_button"}>Submit</Button>
        </form>
      ) : (
        <Button
          className="edit_profession_button"
          callBack={() => addProfessionSelect(dispatch, setSelectAmount)}
        >
          Add a Profession
        </Button>
      )}
    </StyledEditProfessionsModal>
  );
};

export default EditProfessionModal;
