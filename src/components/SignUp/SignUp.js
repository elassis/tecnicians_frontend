import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { SAVE_USER_API } from "../../apis/registerApi";
import { SAVE_ADDRESS_API } from "../../apis/addressApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CITIES_URL } from "../../apis/citiesApi";
import { fetchCities } from "../../redux/slices/City/citySlice";

const SignUp = () => {    
  const { register, handleSubmit, formState:{ errors } } = useForm();
  const dataArray = [];
  const dispatch = useDispatch();
  const [cities, setCities] = useState(); 

  const getData = () => {
    axios.get(CITIES_URL)
    .then(response => {
      dataArray.push(...response.data)
      dispatch(fetchCities(dataArray));
      setCities(dataArray);
    })
    .catch(error => console.log(error));
  }

  useEffect(()=>{
    getData();  
    //eslint-disable-next-line    
  },[]);

  const send = (data) => {
    console.log(data)
    axios.post(SAVE_USER_API,{
      first_name: data.first_name,
      last_name:data.last_name,
      identification:data.identification,
      cellphone:data.cellphone,
      email:data.email,
      password:data.password,
    })
    .then((response) => {response.status === 201 ? saveAddress(response.data.id, data) : console.log("user not saved")})
    .catch((error) => console.log(error));
  }

  const saveAddress = (id, data) => {
    axios.post(SAVE_ADDRESS_API,{
      user_id: id,
      city_id:data.city,
      street:data.street,
      sector:data.sector,
      number:data.number,
    })
    .then((response) => {response.status === 201 ? console.log('address save') : console.log("address not saved")})
    .catch((error) => console.log(error));
  }

  return (
    <>
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
            <div>
              <select {...register("city",{
                required:true
              })}>  
                {cities && cities.map((city) =>{
                  return <option key={city.id} value={city.id}>{city.name}</option>    
                })}
              </select>              
              {errors.city?.type === "required" && <p>city is required</p>}
            </div>
            <div>
              <input placeholder="calle" type="text"  {...register("street",{
                required:true,  
              })} />
              {errors.street?.type === "required" && <p>street is required</p>}
            </div>
            <div>
              <input placeholder="sector" type="text"  {...register("sector",{
                required:true,  
              })} />
              {errors.sector?.type === "required" && <p>sector is required</p>}
            </div>
            <div>
              <input placeholder="numero" type="number" {...register("number",{
                required:true,  
              })} />
              {errors.number?.type === "required" && <p>number is required</p>}
            </div>
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