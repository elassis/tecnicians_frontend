import React from "react";
import PropTypes from "prop-types";
import Tag from "../../common/components/Tag/Tag";

function ResponseModal({ response, mssg }) {
  const params = {
    text:
      response && response.data === 200
        ? mssg && mssg.success
          ? mssg.success
          : "request successfully send"
        : mssg && mssg.success
        ? mssg.failure
        : "Something went wrong, please try again",
    backgroundColor:
      response && response.data === 200
        ? "rgba(10, 255, 28, 0.39)"
        : "rgba(245, 39, 39, 0.26)",
  };

  return <Tag backgroundColor={params.backgroundColor}>{params.text}</Tag>;
}

ResponseModal.propTypes = {
  response: PropTypes.object.isRequired,
  mssg: PropTypes.object,
};

ResponseModal.defaultProps = {
  mssg: {},
};

export default ResponseModal;
