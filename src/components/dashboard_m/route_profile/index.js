/* eslint-disable */
import React, { Component } from 'react';
import './route_profile.css';

import { RouteInfo } from '../../routes_m'

export default class MyRoutes extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className="myRoutes">
                { this.props.bus.map((bus) => (
                    <RouteInfo routeInfo={ bus } key = { bus._id }/>
                )) }
            </div>
        )
    }
}