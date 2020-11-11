import React from "react";

class Login extends React.Component {
    render () {
        return (
            <form className="login-form">
                <input name="email" type="text" placeholder="Email"></input>
                <input name="password" type="text" placeholder="Password"></input>
            </form>
        )
    }
}

export default Login;