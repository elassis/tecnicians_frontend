import React, { useState, useRef, useEffect } from "react";
import http from "../../axiosRequest";
import { useForm, Controller } from "react-hook-form";
import { SAVE_USER_API } from "../../apis/registerApi";
import { SAVE_TECHNICIAN } from "../../apis/techniciansApi";
import { SAVE_ADDRESS_API } from "../../apis/addressApi";
import { SAVE_TECH_PROFESSION } from "../../apis/techProfessionsApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../../redux/slices/City/citySlice";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../redux/slices/User/userSlice";
import { fetchProfessions } from "../../redux/slices/Profession/professionSlice";
import { saveTechnicianProfessions } from "./signUpActions";
import Select from "../../common/components/Select";
import Input from "../../common/components/Input";
import { setSelectAmount } from "../../redux/slices/SignUp/signUpSlice";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectArr = useRef([]);
  const { professions } = useSelector((state) => state.professions);
  const { cities } = useSelector((state) => state.cities);
  const { selectAmount } = useSelector(state => state.signUp);
  const [infoTech, setInfoTech] = useState(false);

  useEffect(() => {
    getCities();
    getProfessions();
    //eslint-disable-next-line
  }, []);



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

  const addRemoveSelect = (type) => {
    if(type === 'add'){
      selectArr.current.push(selectArr.current.length + 1);
    }
    if(type === 'minus'){
      selectArr.current.pop();
    }
    if(type === 'remove'){
      selectArr.current = [];
    }
    dispatch(setSelectAmount([...selectArr.current]));
  };

  async function getCities() {
    dispatch(fetchCities());
  }

  async function getProfessions() {
    dispatch(fetchProfessions());
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
    //saveAddress(response.data.id, data);
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
    //saveProfessions(id, data)
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

  return (
    <>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit(send)}>
        <div>
          <input
            placeholder="First Name"
            type="text"
            {...register("first_name", {
              required: true,
            })}
          />
          {errors.first_name?.type === "required" && <p>Name is required</p>}
        </div>
        <div>
          <input
            placeholder="Last Name"
            type="text"
            {...register("last_name", {
              required: true,
            })}
          />
          {errors.last_name?.type === "required" && (
            <p>last name is required</p>
          )}
        </div>
        <div>
          <input
            placeholder="ID"
            length="11"
            type="number"
            {...register("identification", {
              required: true,
              minLength: 11,
              maxLength: 11,
            })}
          />
          {errors.identification?.type === "required" && (
            <p>identification is required</p>
          )}
          {errors.identification?.type === "minLength" && (
            <p>too few, must be 11 characters length</p>
          )}
          {errors.identification?.type === "maxLength" && (
            <p>too much, must be 11 characters length</p>
          )}
        </div>
        <div>
          <input
            placeholder="Cellphone"
            length="11"
            type="number"
            {...register("cellphone", {
              required: true,
              minLength: 10,
              maxLength: 10,
            })}
          />
          {errors.cellphone?.type === "required" && (
            <p>identification is required</p>
          )}
          {errors.cellphone?.type === "minLength" && (
            <p>too few, must be 11 characters length</p>
          )}
          {errors.cellphone?.type === "maxLength" && (
            <p>too much, must be 11 characters length</p>
          )}
        </div>
        <div>
          <label>Address</label>
          <div>
            <select
              {...register("city", {
                required: true,
              })}
            >
              {cities &&
                cities.map((city) => {
                  return (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  );
                })}
            </select>
            {errors.city?.type === "required" && <p>city is required</p>}
          </div>
          <div>
            <input
              placeholder="calle"
              type="text"
              {...register("street", {
                required: true,
              })}
            />
            {errors.street?.type === "required" && <p>street is required</p>}
          </div>
          <div>
            <input
              placeholder="sector"
              type="text"
              {...register("sector", {
                required: true,
              })}
            />
            {errors.sector?.type === "required" && <p>sector is required</p>}
          </div>
          <div>
            <input
              placeholder="numero"
              type="number"
              {...register("number", {
                required: true,
              })}
            />
            {errors.number?.type === "required" && <p>number is required</p>}
          </div>
        </div>
        <div>
          <input
            placeholder="email"
            type="email"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email?.type === "required" && <p>email is required</p>}
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password?.type === "required" && <p>password is required</p>}
        </div>
        <label>
          <input
            type="checkbox"
            id="cbox1"
            onClick={() => {
              setInfoTech(!infoTech);
              addRemoveSelect(!infoTech ? 'add' : 'remove');
            }}
          />
          I'm a technician
        </label>
        <br />
        {infoTech && (
          <>
            <label>Professions</label>
            <div>
              {selectAmount.map((item, index) => {
                  return (
                    <div key={index}>
                      <Controller
                        name={`profession_${index}`}
                        rules={{ required: "this field is required" }}
                        control={control}
                        render={(field) => (
                          <Select name={field.name} items={professions} />
                        )}
                      />
                      <Controller
                        name={`price_profession_${index}`}
                        rules={{ required: "this field is required" }}
                        control={control}
                        render={(field) => <Input name={field.name} />}
                      />
                      <span
                        key={`plus_${index}`}
                        onClick={() => {
                          addRemoveSelect('add');
                        }}
                      >
                        +
                      </span>
                      &nbsp;
                      <span
                        key={`minus_${index}`}
                        onClick={() => {
                          addRemoveSelect('minus');
                        }}
                      >
                        -
                      </span>
                    </div>
                  );
                })}
            </div>
          </>
        )}
        <button>Register</button>
      </form>
    </>
  );
};

export default SignUp;
