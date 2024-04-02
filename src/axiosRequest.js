import axios from "axios";
import tough from "tough-cookie";

const { CookieJar } = tough;

const cookieJar = new CookieJar(undefined, {
  allowSpecialUseDomain: true,
  rejectPublicSuffixes: false,
});

const http = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_KEY
      : process.env.REACT_APP_PROD_API_KEY,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

http.defaults.jar = cookieJar;

export default http;
