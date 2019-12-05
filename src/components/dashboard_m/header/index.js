/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

export default class DashboardHeader extends Component {
    constructor(props) {
        super(props);
    }

    logout = () => {
        this.props.logout();
    }

    render() {
        return (
            <div className="dashboard_header">
                <ul>
                    <li>
                        <Link to="/dashboard">My Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/profile">My Profile</Link>
                    </li>
                    <li>
                        <a href="#" onClick={ this.logout }>Logout</a>
                    </li>
                </ul>
            </div>
        )
    }
}