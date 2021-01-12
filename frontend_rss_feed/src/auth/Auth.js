import axios from "axios";
import AuthException from "../error/AuthError";

const AUTH_URL = "/api/v1/auth"

/**
 * Initializes the Authorization header for axios and intercepts all API responses to ensure that our Authorization token stays
 * up-to-date.
 * @param {String} jwt Authorization token to be sent in every axios request.
 */
const setupAuthInterceptor = jwt => {
    if (jwt) {
      axios.defaults.headers.common.Authorization = jwt;
    }
  
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
          window.location.href = '/login'
        }
  
        return Promise.reject(error);
      }
    );
  };

const register = (username, password) => {
    return axios.post(AUTH_URL + "/register", {
            username, 
            password
        });
};

const tryLogin = (username, password) => {
    return axios.post("/login", {
        username,
        password
    })
    .then((response) => {
        console.log(response);
        // if (response.headers.authorization) {
        //     localStorage.setItem("jwt", response.headers.authorization)
        // }

        return response
    });
};

const logout = () => {
    localStorage.removeItem("jwt")
};

const authHeader = () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
        return { Authorization: 'Bearer ' + jwt }
    } else {
        return {};
    }
};

async function isTokenValid() {
    const res = await axios.get(AUTH_URL + "/isAuthenticated")
    if (res.status === 200) {
        return true 
    }

    throw new AuthException("Token not valid");
};

export default {
    register,
    tryLogin,
    logout,
    authHeader,
    isTokenValid,
    setupAuthInterceptor
};