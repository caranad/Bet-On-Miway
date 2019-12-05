/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

export default class Login extends Component {
    constructor() {
        super();
    }

    login = (event) => {
        event.preventDefault();
        
        const mockData = {
            username: "aranadic",
            password: "password"
        }
        this.props.login(mockData)
    }

    render() {
        return (
            <div className="bom_login flex_center">
                <div className="bom_login_box flex_center">
                    <h1>Log Into BetOnMiWay</h1>
                    <form onSubmit={ this.login }>
                        <section>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username"></input>
                        </section>
                        <section>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password"></input>
                        </section>
                        <section>
                            <button className="button primary">LOGIN</button>
                        </section>
                        <section>
                            <Link to="/">Back to homepage</Link>
                        </section>
                    </form>
                </div>
            </div>
        )
    }
}