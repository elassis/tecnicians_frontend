import React from "react";
import { ErrorContainer } from "./ErrorBoundaryStyles";

const ErrorMessage = () => {
  return (
    <ErrorContainer>
      <h2 className="title">{'There was an error :('}</h2>
      <p>
        Sorry, there was an unexpected error, please refresh the page or contact
        support.
      </p>
    </ErrorContainer>
  );
};

export default ErrorMessage;
