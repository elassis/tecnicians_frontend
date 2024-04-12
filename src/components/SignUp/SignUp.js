import React, { useState, useEffect } from "react";
import http from "../../axiosRequest";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_USER_API } from "../../apis/registerApi";
import { fetchCities } from "../../redux/slices/City/citySlice";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../redux/slices/User/userSlice";
import { fetchProfessions } from "../../redux/slices/Profession/professionSlice";
import Select from "../../common/components/Select/Select";
import Input from "../../common/components/Input/Input";
import Button from "../../common/components/Button/Button";
import { StyledSignUp } from "./SignUpStyles";
import ProfessionSelect from "../../common/components/ProfessionSelect/ProfessionSelect";
import { addProfessionSelect } from "../../common/utils";
import { setSelectAmount } from "../../redux/slices/SignUp/signUpSlice";
import { storeData } from "../../apis/ApiActions";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    triggerValidation,
    control,
    unregister,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { professions } = useSelector((state) => state.professions);
  const { user } = useSelector((state) => state);
  const { cities } = useSelector((state) => state.cities);
  const { selectAmount } = useSelector((state) => state.signUp);
  const [infoTech, setInfoTech] = useState(false);
  const defaultOption = { id: "default", name: "Select a city" };

  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchProfessions());
  }, [dispatch]);

  useEffect(() => {
    if (user.email) {
      document.cookie = `user_email=${user.email}`;
      navigate("/home");
    }
  }, [user]);

  const send = async (data) => {
    let techArr = [];
    //subtract professions
    if (selectAmount.length > 0) {
      selectAmount.forEach((item) => {
        let profObj = {
          profession_id: data[item.selectName],
          price_hour: data[item.inputName],
        };
        techArr.push(profObj);
      });
    }

    const dataToStore = {
      ...data,
      city_id: data.city,
      professions: techArr,
      type: techArr.length > 0 ? "technician" : "client",
    };
    
    await http.get("/sanctum/csrf-cookie");
    storeData(SAVE_USER_API, dataToStore, dispatch, addUser);
  };

  const handleInputChange = async (e) => {
    await triggerValidation(e.target.name);
  };

  return (
    <StyledSignUp>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit(send)}>
        <Input
          name={"first_name"}
          errors={errors}
          control={control}
          placeholder="First Name"
          onChange={handleInputChange}
          type="text"
          {...register("first_name", {
            required: true,
          })}
        />
        <Input
          name={"last_name"}
          errors={errors}
          control={control}
          placeholder="Last Name"
          onChange={handleInputChange}
          type="text"
          {...register("last_name", {
            required: true,
          })}
        />
        <Input
          name={"identification"}
          errors={errors}
          control={control}
          placeholder="ID"
          onChange={handleInputChange}
          type="text"
          {...register("identification", {
            required: true,
            minLength: 11,
            maxLength: 11,
          })}
        />
        <Input
          name={"cellphone"}
          errors={errors}
          control={control}
          placeholder="Cellphone"
          onChange={handleInputChange}
          type="number"
          {...register("cellphone", {
            required: true,
            minLength: 10,
            maxLength: 10,
          })}
        />
        <Input
          name={"email"}
          errors={errors}
          control={control}
          placeholder="Email"
          onChange={handleInputChange}
          type="email"
          {...register("email", {
            required: true,
          })}
        />
        <Input
          name={"password"}
          errors={errors}
          control={control}
          placeholder="Password"
          onChange={handleInputChange}
          type="password"
          {...register("password", {
            required: true,
          })}
        />
        <fieldset>
          <legend>Address</legend>
          {cities && (
            <Select
              name="city"
              items={[defaultOption, ...cities]}
              errors={errors}
              onChange={handleInputChange}
              {...register("city", {
                required: true,
                pattern: {
                  value: /^\d+$/,
                },
              })}
            />
          )}
          <Input
            name={"street"}
            errors={errors}
            control={control}
            placeholder="Street"
            onChange={handleInputChange}
            type="text"
            {...register("street", {
              required: true,
            })}
          />
          <Input
            name={"sector"}
            errors={errors}
            control={control}
            placeholder="Sector"
            onChange={handleInputChange}
            type="text"
            {...register("sector", {
              required: true,
            })}
          />
          <Input
            name={"number"}
            errors={errors}
            control={control}
            placeholder="Number"
            onChange={handleInputChange}
            type="number"
            {...register("number", {
              required: true,
            })}
          />
        </fieldset>
        <label className="professions_label">
          <Input
            name={"techCheckbox"}
            checked={infoTech}
            type="checkbox"
            onChange={() => {
              setInfoTech((prevState) => !prevState);
              if (!infoTech && selectAmount.length < 1) {
                addProfessionSelect(dispatch, setSelectAmount);
              }
              if (infoTech) {
                selectAmount.forEach((item) => {
                  unregister(item.selectName);
                  unregister(item.inputName);
                });
                dispatch(setSelectAmount([]));
              }
            }}
          />
          I'm a technician
        </label>
        <br />
        {infoTech && (
          <>
            <label className="professions_label">Professions</label>
            <div className="professions_list">
              {selectAmount.map((item, index) => {
                return (
                  <ProfessionSelect
                    id={item.id}
                    key={item.id}
                    errors={errors}
                    register={register}
                    unregister={unregister}
                    placeholder={"price/hour"}
                    inputName={item.inputName}
                    inputValue={item.inputValue}
                    selectName={item.selectName}
                    selectValue={item.selectedValue}
                    className={"profession_wrapper"}
                    items={[...professions]}
                  />
                );
              })}
            </div>
          </>
        )}
        <Button>Register</Button>
      </form>
    </StyledSignUp>
  );
};

export default SignUp;
