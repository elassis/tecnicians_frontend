import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { POST_URL } from "../../apis/registerApi";
import { useSelector } from "react-redux";

const SignUp = () => {    
    const { register, handleSubmit, formState:{ errors } } = useForm();
    const cities = useSelector(state => state.cities);
    const send = (data) => {
        axios.post(POST_URL,{
            first_name: data.first_name,
            last_name:data.last_name,
            identification:data.identification,
            cellphone:data.cellphone,
            city:data.city,
            street:data.street,
            number:data.number,
            email:data.email,
            password:data.password,
        })
        .then(() => console.log("saving..."))
        .catch((error) => console.log(error));
    }

    return (
        <>
        <button onClick={()=>console.log(cities)}>click me</button>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit(send)}>
                <div>                    
                    <input placeholder="First Name"  type="text" {...register("first_name", {
                        required:true,
                    })} />
                    {errors.first_name?.type === "required" && <p>Name is required</p>}
                </div>
                <div>                    
                    <input placeholder="Last Name" type="text" {...register("last_name", {
                        required:true,
                    })} />
                    {errors.last_name?.type === "required" && <p>last name is required</p>}
                </div>
                <div>                    
                    <input placeholder="ID" length="11" type="number" {...register("identification", {
                        required:true,
                        minLength:11,
                        maxLength:11
                    })} />
                    {errors.identification?.type === "required" && <p>identification is required</p>}
                    {errors.identification?.type === "minLength" && <p>too few, must be 11 characters length</p>}
                    {errors.identification?.type === "maxLength" && <p>too much, must be 11 characters length</p>}
                </div>
                <div>                    
                    <input placeholder="Cellphone" length="11" type="number" {...register("cellphone", {
                        required:true,
                        minLength:10,
                        maxLength:10
                    })} />
                    {errors.cellphone?.type === "required" && <p>identification is required</p>}
                    {errors.cellphone?.type === "minLength" && <p>too few, must be 11 characters length</p>}
                    {errors.cellphone?.type === "maxLength" && <p>too much, must be 11 characters length</p>}
                </div>
                <div> 
                    <label>Address</label>                
                    <select {...register("city",{
                        required:true
                    })}>
                        <option value="0">Select one address</option>
                        <option value="bani">Bani</option>
                        <option value="azua">Azua</option>
                        <option value="barahona">Barahone</option>
                    </select>
                    {errors.city?.type === "required" && <p>city is required</p>}
                    <input placeholder="calle" type="text"  {...register("street",{
                        required:true,  
                    })} />
                    {errors.street?.type === "required" && <p>street is required</p>}
                    <input placeholder="numero" type="number" {...register("number",{
                        required:true,  
                    })} />
                    {errors.number?.type === "required" && <p>number is required</p>}
                </div>
                <div>                    
                    <input placeholder="email" type="email" {...register("email",{
                        required:true,
                        
                    })} />
                    {errors.email?.type === "required" && <p>email is required</p>}
                </div>
                <div>                    
                    <input placeholder="Password" type="password" {...register("password",{
                        required:true,
                    })} />
                    {errors.password?.type === "required" && <p>password is required</p>}
                </div>
                <button>Login</button>
            </form>
        </>
    )

}

export default SignUp;