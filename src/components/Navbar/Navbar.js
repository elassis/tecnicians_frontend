import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logOut = () => {
    document.cookie =
      "user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "laravel_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  return (
    <nav>
      <div>
        <p>Icon</p>
      </div>
      {document.cookie.includes("user_email") && (
        <div>
          <button onClick={logOut}>logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
