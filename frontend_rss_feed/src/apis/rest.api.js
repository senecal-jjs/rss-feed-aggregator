import { default as ax } from 'axios';
import { isEnvProd } from '../env';

// TODO: better handling of domain based on env var
export const baseUrl = () => isEnvProd ? 'http://localhost:8080' : 'https://www.seymore.fyi'

const axios = ax.create({
    baseURL: baseUrl()
});

ax.defaults.headers.common.Authorization = localStorage.getItem('jwt');

axios.interceptors.response.use(
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
        window.location.href = baseUrl + '/login'
      }

      return Promise.reject(error);
    }
  );

  export default { axios };