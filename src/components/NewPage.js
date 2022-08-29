import React, { useEffect } from "react";
import axios from "axios";

function NewPage(){
  const http = axios.create({
    baseURL:'http://localhost:80/technicians/public',
    headers:{
      'X-Requested-With': 'XMLHttpRequest', 
    },
    withCredentials:true,
  })
  useEffect(()=>{
    getTechnicians();
    
  },[]);

  async function getTechnicians(){
    const csrf = await http.get('/sanctum/csrf-cookie');
    console.log('csrf = ', csrf);
    
    const login = await http.post('/login', {
      email: "enmanuel@gmail.com",
      password: "rosa1007"
    });

    console.log('login =', login);
  }
}

export default NewPage;