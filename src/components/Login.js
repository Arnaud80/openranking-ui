import React from "react";
import axios from "axios";
import {VtmnButton, VtmnDivider, VtmnTextInput} from "@vtmn/react";
import { GoogleLogin } from '@react-oauth/google';

class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log('Constructor - test='+this.props.test);
        this.state = {
            handleConnected: this.props.handleConnected,
            username: '',
            password: '',
        };
    }

    handleSubmitForm(event) {
        axios.post('http://localhost:8080/api/auth/signin', {
            username: this.state.username,
            password: this.state.password,
        })
            .then((response) => {
                this.props.onConnected(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        event.preventDefault();
    }

    handleChangeLogin(event) {
        let value = event.target.value;
        this.setState({
            username: value,
        });
    }

    handleChangePassword(event) {
        let value = event.target.value;
        this.setState({
            password: value,
        });
    }



    render() {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmitForm(event)}>
                    <div className="identity">
                        <VtmnTextInput
                            identifier='login'
                            type="text"
                            labelText="Login"
                            placeholder="Type your login"
                            value={this.state.username}
                            onChange={(event) => this.handleChangeLogin(event)}/>
                        <VtmnTextInput
                            identifier='password'
                            type="password"
                            labelText="Password"
                            placeholder="Type your password"
                            value={this.state.password}
                            onChange={(event) => this.handleChangePassword(event)}
                        />
                        <VtmnButton type="submit" value="Submit">Connect</VtmnButton>
                    </div>
                </form>
                <VtmnDivider
                    orientation="horizontal"
                    textPosition="start"
                >
                    Or signIn with
                </VtmnDivider>
                <div>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        useOneTap
                    />
                </div>
            </div>
        );
    }
}

export default Login;
