import React from "react";
import axios from 'axios';
import qs from 'qs';
import Button from "./common/Button";
import StackedInput from "./common/Input";
import Form from "./common/Form";

class Login extends React.Component {
    emailRef = React.createRef();
    passwordRef = React.createRef();

    submitLogin = (event) => {
        event.preventDefault();

        const credentials = {
            email: this.emailRef.current.value,
            password: this.passwordRef.current.value, 
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
                    this.props.history.push(`/dashboard`)
                }
            });
    }

    render () {
        return (
            <Form className="login-form" onSubmit={this.submitLogin}>
                <StackedInput name="email" ref={this.emailRef} type="text" placeholder="Email"></StackedInput>
                <StackedInput name="password" ref={this.passwordRef} type="text" placeholder="Password"></StackedInput>
                <Button stacked type="submit">Submit</Button>
            </Form>
        )
    }
}

export default Login;