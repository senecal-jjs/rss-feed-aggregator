import React from "react";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import AuthService from "../auth/Auth";
import Button from "./styles/Button";
import Container from "./styles/Container";
import StackedInput from "./styles/Input";
import H1 from "./styles/Heading";
import Form from "./styles/Form";

function Register() {
    const { userHasAuthenticated } = useAppContext();
    let history = useHistory();
    let usernameRef = React.createRef();
    let passwordRef = React.createRef();

    const submitRegistration = (event) => {
        event.preventDefault();

        const credentials = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }

        AuthService.register(credentials.username, credentials.password).then(res => {
            if (res.status === 200) {
                userHasAuthenticated(true)
                history.push("/dashboard")
            }
        })
    }

    return (
        <Container>
            <H1>Create your account</H1>
            <Form className="login-form" onSubmit={submitRegistration}>
                <StackedInput name="username" ref={usernameRef} type="text" placeholder="Username"></StackedInput>
                <StackedInput name="password" ref={passwordRef} type="text" placeholder="Password"></StackedInput>
                <Button stacked type="submit">Submit</Button>
                <span>Already have an account? <a href="/login">Login</a></span>
            </Form>
        </Container>
    )
}

export default Register;