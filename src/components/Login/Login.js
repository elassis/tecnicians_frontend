import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import http from "../../axiosRequest";
import Input from "../../common/components/Input/Input";
import Button from "../../common/components/Button/Button";
import { StyledLogin } from "./LoginStyles";
import { useDevice } from "../../common/hooks/useDevice";
import { Container } from "../../common/Layout/Container";
import { fetchData } from "../../apis/ApiActions";
import { addUser } from "../../redux/slices/User/userSlice";
import { FETCH_USER_DATA } from "../../apis/usersApi";

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
  const [response, setResponse] = useState(null);
  const [email, setEmail] = useState(null);
  const formErrors = useSelector((state) => state.errors.stateErrors || []);

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
    if (response?.status === 200) {
      document.cookie = `user_email=${email}`;
      localStorage.setItem("user_email", email);
      setUser(email);
      navigate("/home");
    }
  }, [response, email]);

  const handleInputChange = async (e) => {
    await triggerValidation(e.target.name);
  };

  const addUserHandler = (data) => {
    dispatch(addUser(data.user_info));
  };

  //TODO - this should use the apirequests actions
  const send = async (data) => {
    await http.get("/sanctum/csrf-cookie");
    http
      .post("/login", data)
      .then((response) => {
        setEmail(data.email);
        setResponse(response);
      })
      .catch((error) => console.log(error));
  };

  const setUser = (email) => {
    const url = FETCH_USER_DATA.replace("{email}", email);
    fetchData(url, dispatch, addUserHandler);
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
