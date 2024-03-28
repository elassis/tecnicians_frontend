import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import http from "../../axiosRequest";
import Input from "../../common/components/Input/Input";
import Button from "../../common/components/Button/Button";
import { StyledLogin } from "./LoginStyles";
import { useDevice } from "../../common/hooks/useDevice";
import { setErrors } from "../../redux/slices/Errors/errorsSlice";
import { Container } from "../../common/Layout/Container";

function Login() {
  const {
    register,
    handleSubmit,
    control,
    setError,
    triggerValidation,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { isMobile } = useDevice();

  const dispatch = useDispatch();

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

  const handleInputChange = async (e) => {
    await triggerValidation(e.target.name);
  };

  async function send(data) {
    await http.get("/sanctum/csrf-cookie");
    http
      .post("/login", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        if (response.status === 200) {
          document.cookie = `user_email=${data.email}`;
          localStorage.setItem("user_email", data.email);
          navigate("/home");
        }
      })
      .catch((error) => dispatch(setErrors(error.response.data.errors)));
  }
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
