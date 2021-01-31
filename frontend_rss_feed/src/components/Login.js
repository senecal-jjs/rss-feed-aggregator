import React from "react";
import { useHistory } from "react-router-dom"
import axios from 'axios';
import qs from 'qs';
import Button from "./styles/Button";
import Container from "./styles/Container";
import StackedInput from "./styles/Input";
import H1 from "./styles/Heading";
import Form from "./styles/Form";
import { useAppContext } from "../libs/contextLib";
import AuthService from "../auth/Auth";

function Login() {
    const { userHasAuthenticated } = useAppContext(); 
    let history = useHistory();
    let usernameRef = React.createRef();
    let passwordRef = React.createRef();

    const submitLogin = (event) => {
        event.preventDefault();

        const credentials = {
            username: usernameRef.current.value,
            password: passwordRef.current.value, 
        }

        AuthService.tryLogin(credentials.username, credentials.password).then(res => {
            if (res.status === 200) {
                userHasAuthenticated(true);
                history.push("/dashboard")
            }
        })

        // axios({ 
        //     method: 'post',
        //     url: '/login',
        //     headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
        //     data: qs.stringify({
        //         email: credentials.email,
        //         password: credentials.password
        //     })
        //  })
        //     .then(res => {
        //         if (res.status === 200) {
        //             userHasAuthenticated(true);
        //             history.push("/dashboard");
        //         }
        //     });
    }

    return (
        <Container>
            <H1>Login to your account</H1>
            <Form className="login-form" onSubmit={submitLogin}>
                <StackedInput name="username" ref={usernameRef} type="text" placeholder="Username"></StackedInput>
                <StackedInput name="password" ref={passwordRef} type="text" placeholder="Password"></StackedInput>
                <Button stacked type="submit">Submit</Button>
                <span>Don't have an account? <a href="/register">Sign Up</a></span>
            </Form>
        </Container>
    )
}

export default Login;