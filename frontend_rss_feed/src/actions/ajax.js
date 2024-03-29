import _axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL

export const axios = _axios.create({
    baseURL: baseUrl 
});

// axios.defaults.headers.common.Authorization = localStorage.getItem('jwt');

axios.interceptors.request.use(req => {
  req.headers.authorization = localStorage.getItem('jwt');
  return req;
});

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      const { authorization } = response.headers;
      console.log(response.headers);
      console.log("response was 200");
      if (typeof authorization === 'string' && authorization.indexOf('Bearer ') === 0) {
        console.log("setting jwt");
        localStorage.setItem("jwt", authorization)
      }
    }

    return response;
  },
  error => {
    // Have to check error object existence due to possibility of cancelations.
    if (
      (error?.response?.status === 403 && error?.response?.data?.message?.toUpperCase() === 'UNAUTHENTICATED') ||
      error?.response?.status === 401
    ) {
      window.location.href = baseUrl + '/login'
    }

    return Promise.reject(error);
  }
);

function errorHandling(error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      // TODO: handle request error
      console.error(`Unexpected request error ${error.request}`, error); 
    } else {
      console.error(`Something happened setting up the request ${error.message}`, error); 
    }
    return null;
  }

export const ajaxGet = async (action, dispatch, url) => {
    dispatch({type: `${action}_REQUEST`})
    try {
        const result = await axios.get(url);
        dispatch({type: `${action}_SUCCESS`, payload: result.data});
        return Promise.resolve(result.data);
    } catch (error) {
        dispatch({type: `${action}_FAILURE`});
    }
}

export const ajaxPost = async (action, dispatch, url, data) => {
    try {
        const result = await axios.post(url, data);
        dispatch({type: `${action}_SUCCESS`, payload: result.data});
        return Promise.resolve(result.data);
    } catch (error) {
        dispatch({type: `${action}_FAILURE`});
    }
}
