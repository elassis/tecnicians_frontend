import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Input from "../../../common/components/Input/Input";
import Select from "../../../common/components/Select/Select";
import Button from "../../../common/components/Button/Button";
import { fetchCities } from "../../../redux/slices/City/citySlice";
import { StyledModal } from "./EditInfoModalStyles";
import { updateData } from "../../../apis/ApiActions";
import { UPDATE_USER_DATA } from "../../../apis/usersApi";
import { addTechnician } from "../../../redux/slices/Technician/technicianSlice";
import { setErrors } from "../../../redux/slices/Errors/errorsSlice";
import ResponseModal from "../SuccessModal";
import { showEditInfoModal } from "../../../redux/slices/Modals/modalSlice";

const EditInfoModal = ({ id, first_name, last_name, email, address, type }) => {
  const {
    handleSubmit,
    control,
    triggerValidation,
    register,
    formState: { errors },
  } = useForm();

  const { cities } = useSelector((state) => state.cities);
  const [orderedCities, setOrderedCities] = useState(null);
  const [response, setResponse] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCities());    
  }, []);

  useEffect(() => {
    if (response !== null) {
      const timer = setTimeout(() => {
        dispatch(showEditInfoModal(false));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [response]);

  useMemo(() => {
    if (cities && cities.length > 0) {
      const prevCity = cities.filter((city) => city.name === address.city);
      const restOfCities = cities.filter((city) => city.name !== address.city);
      restOfCities.unshift(prevCity[0]);
      setOrderedCities(restOfCities);
    }
  }, [cities]);

  const send = (data) => {
    const url = UPDATE_USER_DATA.replace("{id}", id);
    const actions = {
      failure: setErrors,
      success: addTechnician,
      responseChange: setResponse,
    };

    if (data.city_id.length < 1) data.city_id = orderedCities[0].id;

    data['type'] = type;

    updateData(url, data, dispatch, actions);
  };

  const handleInputChange = async (e) => {
    await triggerValidation(e.target.name);
  };

  return (
    <StyledModal>
      {response !== null ? (
        <ResponseModal response={{ data: response }} />
      ) : (
        <form onSubmit={handleSubmit(send)}>
          <Input
            name={"first_name"}
            errors={errors}
            control={control}
            defaultValue={first_name}
            onChange={handleInputChange}
            {...register("first_name", {
              required: true,
            })}
          />
          <Input
            name={"last_name"}
            errors={errors}
            control={control}
            defaultValue={last_name}
            onChange={handleInputChange}
            {...register("last_name", {
              required: true,
            })}
          />
          <Input
            name={"email"}
            errors={errors}
            control={control}
            defaultValue={email}
            onChange={handleInputChange}
            {...register("email", {
              required: true,
            })}
          />
          <fieldset>
            <legend>address</legend>
            {orderedCities && (
              <Select
                name="city_id"
                items={orderedCities}
                errors={errors}
                onChange={handleInputChange}
                {...register("city_id")}
              />
            )}
            <Input
              name={"street"}
              errors={errors}
              control={control}
              onChange={handleInputChange}
              defaultValue={address.street}
              {...register("street", {
                required: true,
              })}
            />
            <Input
              name={"sector"}
              errors={errors}
              control={control}
              onChange={handleInputChange}
              defaultValue={address.sector}
              {...register("sector", {
                required: true,
              })}
            />
            <Input
              name={"number"}
              errors={errors}
              control={control}
              onChange={handleInputChange}
              defaultValue={address.number}
              {...register("number", {
                required: true,
              })}
            />
          </fieldset>
          <Button>Submit</Button>
        </form>
      )}
    </StyledModal>
  );
};

EditInfoModal.propTypes = {
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.object.isRequired,
};

export default EditInfoModal;
