import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import http from "../../axiosRequest";
import Input from "../../common/components/Input/Input";
import Button from "../../common/components/Button/Button";
import { StyledLogin } from "./LoginStyles";
import { useDevice } from "../../common/hooks/useDevice";
import { Container } from "../../common/Layout/Container";
import { fetchData, storeData } from "../../apis/ApiActions";
import { addUser } from "../../redux/slices/User/userSlice";
import { FETCH_USER_DATA } from "../../apis/usersApi";
import {
  setResponse,
} from "../../redux/slices/Response/responseSlice";

function Login() {
  const {
    register,
    handleSubmit,
    control,
    setError,
    triggerValidation,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "elp_07@hotmail.com", password: "rosa1007" },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isMobile } = useDevice();
  const email = useRef(null);
  const formErrors = useSelector((state) => state.errors.stateErrors || []);
  const { response } = useSelector((state) => state.response);

  useEffect(() => {
    if (Object.keys(formErrors).length > 0) {
      Object.keys(formErrors).forEach((key) => {
        setError(`${key}`, {
          type: "manual",
          message: `${formErrors[key][0]}`,
        });
      });
    }
  }, [formErrors, setError]);

  useEffect(() => {
    if (response.status === 200 && email.current !== null) {
      document.cookie = `user_email=${email.current}`;
      localStorage.setItem("user_email", email.current);
      setUser(email.current);
    }

    if(response?.data?.status === 202){
      addUserHandler(response);
    }
  }, [response]);

  const handleInputChange = async (e) => {
    await triggerValidation(e.target.name);
  };

  const addUserHandler = (data) => {
    dispatch(addUser(data.data.data.user_info));
    navigate("/home");
  };

  const send = async (data) => {
    email.current = data.email;
    await http.get("/sanctum/csrf-cookie");
    storeData("/login", data, dispatch, setResponse);
  };

  const setUser = (email) => {
    const url = FETCH_USER_DATA.replace("{email}", email);
    fetchData(url, dispatch, setResponse);
  };

  return (
    <Container>
      <StyledLogin $isMobile={isMobile}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(send)}>
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
            control={control}
            errors={errors}
            placeholder="Password"
            onChange={handleInputChange}
            type="password"
            {...register("password", {
              required: true,
            })}
          />
          <Button>Login</Button>
        </form>
      </StyledLogin>
    </Container>
  );
}

export default Login;
