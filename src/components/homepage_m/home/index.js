/* eslint-disable */
import React, { Component } from 'react';
import './home.css';

class Home extends Component {
    constructor() {
        super();
    }

    goToLogin = () => {
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="bom_homepage">
                <div className="bom_home_intro flex_center">
                    <h1 className="bom_title">Bet On Miway</h1>
                    <h3>
                        Frustrated about your bus being late? Now comes a way that you can make it fun!
                        Just bet on how late you think the bus will be, and if it's correct, then you'll win points that you can
                        use to redeem on whatever cash prize you want!
                    </h3>
                    <button className="button primary" onClick={ this.goToLogin }>Let's Play!</button>
                </div>
            </div>
        )
    }
}

export default {
    routeProps: {
        path: '/',
        exact: true,
        component: Home
    },
    name: 'Home',
}