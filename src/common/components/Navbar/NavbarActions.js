
import { persistor } from "../../../App";
export const logout = () => {
  document.cookie =
    "user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "laravel_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  persistor.purge();
};
