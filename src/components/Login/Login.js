import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import http from "../../axiosRequest";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();


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
          localStorage.setItem('user_email',data.email);
          navigate("/home");
        }
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(send)}>
        <div>
          <input
            placeholder="Username"
            type="email"
            {...register("email", {
              required: true,
            })}
          />
          {errors.user?.type === "required" && <p>user is required</p>}
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
        <button>Login</button>{" "}
        <button onClick={() => navigate("/signup")}>signup</button>
      </form>
    </>
  );
};

export default Login;
