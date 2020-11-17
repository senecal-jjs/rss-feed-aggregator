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

function Login() {
    const { userHasAuthenticated } = useAppContext(); 
    let history = useHistory();
    let emailRef = React.createRef();
    let passwordRef = React.createRef();

    const submitLogin = (event) => {
        event.preventDefault();

        const credentials = {
            email: emailRef.current.value,
            password: passwordRef.current.value, 
        }

        axios({ 
            method: 'post',
            url: '/login',
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
            data: qs.stringify({
                email: credentials.email,
                password: credentials.password
            })
         })
            .then(res => {
                if (res.status === 200) {
                    userHasAuthenticated(true);
                    history.push("/dashboard");
                }
            });
    }

    return (
        <Container>
            <H1>Login or Register</H1>
            <Form className="login-form" onSubmit={submitLogin}>
                <StackedInput name="email" ref={emailRef} type="text" placeholder="Email"></StackedInput>
                <StackedInput name="password" ref={passwordRef} type="text" placeholder="Password"></StackedInput>
                <Button stacked type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default Login;