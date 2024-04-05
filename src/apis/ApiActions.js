import http from "../axiosRequest";

//THOSE FUNCTIONS MUST BE REFACTOR - shouldn't use dispatch here
export const storeData = async (url, data, dispatch, actions) => {
  http
    .post(url, data)
    .then((response) => {
      dispatch(actions.success(response.data.data));
      actions.responseChange(response.status);
    })
    .catch((error) => {
      dispatch(actions.failure(error.message));
      actions.responseChange(error.message);
    });
};

export const fetchData = async (url, dispatch, action) => {
  http
    .get(url)
    .then((response) => {
      dispatch(action(response.data.data));
    })
    .catch((error) => console.log(error.message));
};

export const updateData = async (url, data, dispatch, actions) => {
  http
    .put(url, data)
    .then((response) => {
      dispatch(actions.success(response.data.data));
      actions.responseChange(response.status);
    })
    .catch((error) => {
      dispatch(actions.failure(error.message));
      actions.responseChange(error.message);
    });
};

export const deleteData = async (url, dispatch, actions) => {
  http
    .delete(url)
    .then((response) => {
      dispatch(actions.success(response.data.data));
      actions.responseChange(response.status);
    })
    .catch((error) => {
      dispatch(actions.failure(error.message));
      actions.responseChange(error.message);
    });
};
