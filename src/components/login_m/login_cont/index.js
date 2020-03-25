/* eslint-disable */
import React, { Component } from 'react';
import Login from '../login_box'
import axios from 'axios';
import './login.css';

class LoginContainer extends Component {
    constructor() {
        super();
    }

    doLogin = (data) => {
        //this.props.history.push('/dashboard');

        axios.post("http://localhost:3001/login", { username: data.username, password: data.password }).then((response) => {
            if (response.data.status) {
                this.props.history.push('/dashboard');
            }
            else {
                alert("Incorrect username or password");
            }
        })
    }

    render() {
        return (
            <div className="bom_login_container">
                <Login login={ (data) => { this.doLogin(data) } } />
            </div>
        )
    }
}

export default {
    routeProps: {
        path: '/login',
        component: LoginContainer
    },
    name: 'Login',
}