/* eslint-disable */
import React, { Component } from 'react';
import './route.css'

export default class RouteInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="route_info">
                <div>
                    <b>Route: </b> { this.props.routeInfo.bus_id } { this.props.routeInfo.direction }
                </div>
                <div>
                    <b>From Bus Stop: </b> { this.props.routeInfo.stop_id }
                </div>
                <div>
                    <b>Bet Amount: </b> { this.props.routeInfo.amount }
                </div>
            </div>
        )
    }
}