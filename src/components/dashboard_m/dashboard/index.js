/* eslint-disable */
import React, { Component } from 'react';

import './dashboard.css'

import MyRoutes from '../route_profile';
import BetForm from '../bet_form';
import DashboardHeader from '../header';

import axios from 'axios';

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            routes: []
        }

        setInterval(() => {
            axios.get("http://localhost:3001/trackBets").then((response) => {
                console.log(response.data);
            })
        }, 60000)
    }

    componentDidMount() {
        axios.get("http://localhost:3001/bets/aranadic").then((response) => {
            this.setState({
                routes: response.data
            })
        })
    }

    sendBet = (data) => {
        axios.post("http://localhost:3001/bet", { bet: data }).then((response) => {
            if (response.data.err) {
                alert(response.data.err)
            }
            else {
                alert(response.data.success);
                const routes = this.state.routes;
                routes.push(data);
                this.setState({
                    routes: routes
                })
            }
        })
    }

    logout = () => {
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="dashboard_container">
                <div className="dashboard_header_container">
                    <DashboardHeader logout={ this.logout }/>
                </div>
                <div className="dashboard_profile">
                    <h1>Welcome back, user!</h1>
                </div>
                <div className="dashboard_options full">
                    <div className="half">
                        <MyRoutes bus={ this.state.routes }/>
                    </div>
                    <div className="half">
                        <BetForm submitForm= { this.sendBet }/>
                    </div>
                </div>
            </div>
        )
    }
}

export default {
    routeProps: {
        path: '/dashboard',
        component: Dashboard
    },
    name: 'Dashboard',
}