import axios from "axios";
import AuthException from "../error/AuthError";

// export async function currentSession() {
//     const res = await axios.get("/check-session");

//     if (res.data.profile_id !== "") {
//         return res.data;
//     }

//     throw new AuthException("No valid sesion");
// }

const AUTH_URL = "/api/v1/auth"

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
        if (response.headers.authorization) {
            localStorage.setItem("jwt", response.headers.authorization)
        }

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
    isTokenValid
};