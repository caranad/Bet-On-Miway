/* eslint-disable */
import React, { Component } from 'react';
import DashboardHeader from '../header';
import './user_profile.css'

class UserProfile extends Component {
    constructor() {
        super();

        this.profilePic = "https://www.flynz.co.nz/wp-content/uploads/profile-placeholder.png";
    }

    logout = () => {
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="user_profile_container">
                <div className="dashboard_header_container">
                    <DashboardHeader logout={ this.logout }/>
                </div>
                <div className="user_profile_info">
                    <div className="user_pic">
                        <img src = { this.profilePic }/>
                        <h1>User McUserName</h1>
                        <p>Email goes here</p>
                        <p>Points accumulated</p>
                        <button className="button primary">Edit profile</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default {
    routeProps: {
        path: '/profile',
        component: UserProfile
    },
    name: 'Profile',
}