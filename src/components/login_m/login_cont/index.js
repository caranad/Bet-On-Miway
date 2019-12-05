/* eslint-disable */
import React, { Component } from 'react';
import Login from '../login_box'
import './login.css';

class LoginContainer extends Component {
    constructor() {
        super();
    }

    doLogin = (data) => {
        this.props.history.push('/dashboard');
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