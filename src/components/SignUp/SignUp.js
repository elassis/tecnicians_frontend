import React, { useState, useRef, useEffect } from "react";
import http from "../../axiosRequest";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_USER_API } from "../../apis/registerApi";
import { SAVE_TECHNICIAN } from "../../apis/techniciansApi";
import { SAVE_ADDRESS_API } from "../../apis/addressApi";
import { SAVE_TECH_PROFESSION } from "../../apis/techProfessionsApi";
import { fetchCities } from "../../redux/slices/City/citySlice";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../redux/slices/User/userSlice";
import { fetchProfessions } from "../../redux/slices/Profession/professionSlice";
import { saveTechnicianProfessions } from "./signUpActions";
import Select from "../../common/components/Select/Select";
import Input from "../../common/components/Input/Input";
import Button from "../../common/components/Button/Button";
import { StyledSignUp } from "./SignUpStyles";
import ProfessionSelect from "../../common/components/ProfessionSelect/ProfessionSelect";
import { addProfessionSelect } from "../../common/utils";
import { setSelectAmount } from "../../redux/slices/SignUp/signUpSlice";

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
  const { cities } = useSelector((state) => state.cities);
  const { selectAmount } = useSelector((state) => state.signUp);
  const [infoTech, setInfoTech] = useState(false);
  const defaultOption = { id: "default", name: "Select a city" };

  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchProfessions());
  }, [dispatch]);

  async function login(email, password) {
    http
      .post("/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/home");
        }
      })
      .catch((error) => console.log(error));
  }

  async function send(data) {
    http
      .post(SAVE_USER_API, {
        first_name: data.first_name,
        last_name: data.last_name,
        identification: data.identification,
        cellphone: data.cellphone,
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        if (response.status === 201) {
          const userObj = {
            id: response.data.id,
            email: response.data.email,
            password: response.data.password,
          };
          document.cookie = `user_email=${userObj.email}`;
          dispatch(addUser(userObj));
          saveAddress(response.data.id, data);
        } else {
          console.log("user not saved");
        }
      })
      .catch((error) => console.log(error));
  }

  const saveAddress = (id, data) => {
    http
      .post(SAVE_ADDRESS_API, {
        user_id: id,
        city_id: data.city,
        street: data.street,
        sector: data.sector,
        number: data.number,
      })
      .then((response) => {
        let cookie = document.cookie;
        response.status === 201 && cookie.search("XSRF-TOKEN") !== -1
          ? infoTech
            ? saveTechnician(id, data)
            : login(data.email, data.password)
          : console.log("address not saved");
      })
      .catch((error) => console.log(error));
  };

  const saveTechnician = (id, data) => {
    http
      .post(SAVE_TECHNICIAN, {
        user_id: id,
      })
      .then((response) => {
        if (response.status === 201) {
          saveProfessions(response.data.id, data);
        }
      })
      .catch((error) => console.log(error));
  };

  const saveProfessions = (id, data) => {
    const result = saveTechnicianProfessions(id, data);
    let existError = false;
    //TODO - refactor this is making a request repeatedly
    for (let prof in result) {
      http
        .post(SAVE_TECH_PROFESSION, {
          technician_id: id,
          profession_id: result[prof]["profession"],
          price_hour: result[prof]["price"],
        })
        .catch((error) => {
          existError = true;
          console.log(error);
        });
    }
    if (!existError) {
      login(data.email, data.password);
    }
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
              setInfoTech(!infoTech);
              if (infoTech && selectAmount.length < 1) {
                addProfessionSelect(dispatch, setSelectAmount);
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
                    items={[
                      { ...defaultOption, name: "Select a profession" },
                      ...professions,
                    ]}
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
