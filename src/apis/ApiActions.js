import http from "../axiosRequest";
import { setErrors } from "../redux/slices/Errors/errorsSlice";

export const storeData = async (url, data, dispatch, responseAction) => {
  http
    .post(url, data)
    .then((response) => {
      const responseObj = { data: response.data, status: response.status };
      dispatch(responseAction(responseObj));
    })
    .catch((error) => {
      dispatch(setErrors(error.message));
    });
};

export const fetchData = async (url, dispatch, responseAction) => {
  http
    .get(url)
    .then((response) => {
      const responseObj = { data: response.data, status: response.status };
      dispatch(responseAction(responseObj));
    })
    .catch((error) => dispatch(setErrors(error.message)));
};

export const updateData = async (url, data, dispatch, responseAction) => {
  http
    .put(url, data)
    .then((response) => {
      const responseObj = { data: response.data, status: response.status };
      dispatch(responseAction(responseObj));
    })
    .catch((error) => dispatch(setErrors(error.message)));
};

export const deleteData = async (url, dispatch, responseAction) => {
  http
    .delete(url)
    .then((response) => {
      const responseObj = { data: response.data, status: response.status };
      dispatch(responseAction(responseObj));
    })
    .catch((error) => dispatch(setErrors(error.message)));
};
