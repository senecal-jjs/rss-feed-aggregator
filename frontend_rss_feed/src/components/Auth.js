import axios from "axios";

const register = (username, password) => {
    return axios.post("/register", {
            username, 
            password
        });
};

const login = (username, password) => {
    return axios.post("/login", {
        username,
        password
    })
    .then((response) => {
        if (response.headers.Authorization) {
            localStorage.setItem("jwt", response.headers.Authorization)
        }

        return response.data
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

export default {
    register,
    login,
    logout,
    authHeader
};