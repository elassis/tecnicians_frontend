import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CITIES_URL } from "../../apis/citiesApi";
import { fetchCities } from "../../redux/slices/City/citySlice";

const Home = () => {
  const dataArray = [];
  const dispatch = useDispatch();
  const cities = useSelector(state => state.cities);
  const navigate = useNavigate()
  const getData = () => {
    axios.get(CITIES_URL)
      .then(response => dataArray.push(...response.data))
      .catch(error => console.log(error));
      dispatch(fetchCities(dataArray));
  }

  useEffect(() =>{
    getData();
    // eslint-disable-next-line
  },[]);

  const goToSignup = () => {
    navigate('/signup');
  }
  return (
      <div>
           <h1>This is the Home</h1>
          <button onClick={goToSignup}>signup</button>
          <button onClick={()=>console.log(cities)}>click me</button>
      </div>

  )
}

export default Home;