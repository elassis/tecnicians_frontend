import axios from "axios"
import tough from "tough-cookie";

const { CookieJar } = tough;

const cookieJar = new CookieJar(undefined, {
  allowSpecialUseDomain: true,
  rejectPublicSuffixes: false
});

const http = axios.create({
  baseURL:'http://localhost:8080/technicians/public',
  headers:{
    'X-Requested-With': 'XMLHttpRequest', 
  },
  withCredentials:true,
});

http.defaults.jar = cookieJar;

export default http;