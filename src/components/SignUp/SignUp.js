import React, { useState } from "react";
import http from "../../axiosRequest";
import { useForm } from "react-hook-form";
import { SAVE_USER_API } from "../../apis/registerApi";
import { SAVE_TECHNICIAN } from "../../apis/techniciansApi";
import { SAVE_ADDRESS_API } from "../../apis/addressApi";
import { SAVE_TECH_PROFESSION } from "../../apis/techProfessionsApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CITIES_URL } from "../../apis/citiesApi";
import { fetchCities } from "../../redux/slices/City/citySlice";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../redux/slices/User/userSlice";
import { PROFESSIONS_URL } from "../../apis/professionApi";
import { fetchProfessions } from "../../redux/slices/Profession/professionSlice";
import { saveTechnicianProfessions } from "./signUpActions";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dataArray = [];
  //const selectArrTest = [1]
  const [selectArr, setSelectArr] = useState([1]);
  const professionsArr = [];
  const dispatch = useDispatch();
  const [cities, setCities] = useState();
  const [professions, setProfessions] = useState();
  const [infoTech, setInfoTech] = useState(false);
  const navigate = useNavigate();

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

  async function getCities() {
    await http
      .get(CITIES_URL)
      .then((response) => {
        dataArray.push(...response.data);
        dispatch(fetchCities(dataArray));
        setCities(dataArray);
      })
      .catch((error) => console.log(error));
  }

  async function getProfessions() {
    await http
      .get(PROFESSIONS_URL)
      .then((response) => {
        professionsArr.push(...response.data);
        dispatch(fetchProfessions(professionsArr));
        setProfessions(professionsArr);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getCities();
    getProfessions();
    //eslint-disable-next-line
  }, []);
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
              setSelectArr([1]);
              setInfoTech(!infoTech);
            }}
          />
          I'm a technician
        </label>
        <br />
        {infoTech && (
          <>
            <label>Professions</label>
            <div>
              {selectArr.map((item, index) => {
                return (
                  <div key={index}>
                    <select
                      {...register(`profession_${index}`, {
                        required: true,
                      })}
                    >
                      {professions &&
                        professions.map((prof) => {
                          return (
                            <option key={prof.id} value={prof.id}>
                              {prof.name}
                            </option>
                          );
                        })}
                    </select>
                    <input
                    placeholder="price/hour"
                      type="number"
                      {...register(`price_profession_${index}`, {
                        required: true,
                      })}
                    />
                    <button
                      key={item}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectArr((selectArr) => [...selectArr, 1]);
                      }}
                    >
                      +
                    </button>
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
