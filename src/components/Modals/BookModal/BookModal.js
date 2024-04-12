import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "../../../common/components/Button/Button";
import Text from "../../../common/components/Text/Text";
import Input from "../../../common/components/Input/Input";
import Select from "../../../common/components/Select/Select";
import { StyledBookModal } from "./BookModalStyles";
import Textarea from "../../../common/components/Textarea/Textarea";
import { showBookingModal } from "../../../redux/slices/Modals/modalSlice";
import { storeData } from "../../../apis/ApiActions";
import { SAVE_JOBS } from "../../../apis/jobsApi";
import ResponseModal from "../SuccessModal";
import { setResponse } from "../../../redux/slices/Response/responseSlice";

const DateInputWithLabelHOC = ({ name, text, register, errors, control }) => {
  return (
    <div className="dateInput">
      <Text>{text}</Text>
      <Input
        type={"date"}
        name={name}
        control={control}
        errors={errors}
        {...register(`${name}`, { required: true })}
      />
    </div>
  );
};

const BookModal = ({ id, name, professions }) => {
  const {
    register,
    handleSubmit,
    triggerValidation,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const { user } = useSelector((state) => state);
  const { response } = useSelector((state) => state.response);
  const [defaultMessage, setDefaultMessage] = useState(null);
  const defaultOption = { id: "default", name: "Select profession" };
  const selectValue = watch("profession_id");
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (
      selectValue !== null &&
      selectValue !== undefined &&
      selectValue !== "default"
    ) {
      const selectedArr = professions.filter(
        (prof) => prof.id === Number(selectValue)
      );
      setDefaultMessage(
        `Default message: Hi there!, I'd like to contract you as ${selectedArr[0].name}`
      );
    }
  }, [selectValue]);

  useEffect(() => {
    if (response.hasOwnProperty("status")) {
      const timer = setTimeout(() => {
        dispatch(showBookingModal(false));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [response]);

  const sendFormData = async (data) => {
    if (data.text === "") {
      data.text = defaultMessage;
    }
    const fullInfo = {
      ...data,
      profession_id: Number(data.profession_id),
      user_id: user.id,
      technician_id: id,
    };
    storeData(SAVE_JOBS, fullInfo, dispatch, setResponse);
  };

  const handleInputChange = async (e) => {
    await triggerValidation(e.target.name);
  };

  return (
    <StyledBookModal>
      {response.hasOwnProperty("status") ? (
        <ResponseModal response={{ data: response.status }} />
      ) : (
        <form onSubmit={handleSubmit(sendFormData)}>
          <Input
            name={"user_name"}
            errors={errors}
            control={control}
            defaultValue={name}
            {...register("user_name")}
          />
          <div className="dates">
            <DateInputWithLabelHOC
              name={"begin_date"}
              text={"from"}
              errors={errors}
              control={control}
              register={register}
            />
            <DateInputWithLabelHOC
              name={"end_date"}
              text={"to"}
              errors={errors}
              control={control}
              register={register}
            />
          </div>
          <Select
            name={"profession_id"}
            control={control}
            onChange={handleInputChange}
            items={[defaultOption, ...professions]}
            errors={errors}
            {...register("profession_id", {
              required: true,
              pattern: {
                value: /^\d+$/,
              },
            })}
          />
          {selectValue &&
            selectValue !== null &&
            selectValue !== undefined &&
            selectValue !== "default" && (
              <Textarea
                name={"text"}
                onChange={handleInputChange}
                control={control}
                placeholder={defaultMessage}
                errors={errors}
                {...register("text")}
              />
            )}
          <Button>send</Button>
        </form>
      )}
    </StyledBookModal>
  );
};

export default BookModal;
