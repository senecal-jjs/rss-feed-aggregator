import axios from 'axios';

const sessionKey = 'jwt';
const jwt = window.localStorage.getItem(sessionKey);

const restApi = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {Authorization: jwt }
});

restApi.interceptors.use(
    response => {
      if (response.status === 200) {
        const { authorization } = response.headers;

        if (typeof authorization === 'string' && authorization.indexOf('Bearer ') === 0) {
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
        window.location.href = '/login'
      }

      return Promise.reject(error);
    }
  );

  export { restApi };