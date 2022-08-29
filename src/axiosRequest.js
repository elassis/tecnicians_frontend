import axios from "axios"

const http = axios.create({
  baseURL:'http://localhost:80/technicians/public',
  headers:{
    'X-Requested-With': 'XMLHttpRequest', 
  },
  withCredentials:true,
});

export default http;