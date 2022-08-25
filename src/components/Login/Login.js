import React from "react";
import { useForm } from "react-hook-form";


const Login = () => {

    const { register, handleSubmit, formState:{ errors }} = useForm();
    const send = (data) => {
        console.log(data);
    }
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(send)}>
                <div>                    
                    <input placeholder="Username" type="text" {...register("user", {
                        required:true
                    })} />
                    {errors.user?.type === "required" && <p>user is required</p>}
                </div>
                <div>                    
                    <input placeholder="Password" type="password" {...register("password",{
                        required:true
                    })} />
                    {errors.password?.type === "required" && <p>password is required</p>}
                </div>
                <button>Login</button>
            </form>
        </>
    )

}

export default Login;