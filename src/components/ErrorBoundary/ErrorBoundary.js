import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ErrorMessage from "./ErrorMessage";

const ErrorBoundary = ({children}) => {
  const [error, setError] = useState(null);

  useEffect(()=>{
    const errorHandler = (error, errorInfo) => {
      // Log the error to an error reporting service
      console.error(error, errorInfo);
      setError(true);
    };

    // Register error handler
    window.addEventListener('error', errorHandler);

    // Clean up error handler
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  },[])

  if(error){
    return <ErrorMessage />;
  }

  return children;

}

ErrorBoundary.propTypes = {
  children: PropTypes.any.isRequired,
}

export default ErrorBoundary;