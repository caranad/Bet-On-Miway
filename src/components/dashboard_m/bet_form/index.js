/* eslint-disable */
import React, { Component } from 'react';
import './bet_form.css'

import axios from 'axios';

export default class BetForm extends Component {
    constructor() { 
        super();
        this.state = {
            routes: [],
            stops: [],
            route: "",
            stop: ""
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/routes").then((response) => {
            this.setState({
                routes: response.data 
            })
        })
    }

    submitBet = (event) => {
        event.preventDefault();

        const bet_info = {
            user_id: "aranadic",
            bus_id: this.state.route.split(" ")[0],
            direction: this.state.route.split(" ")[1],
            stop_id: this.state.stop,
            amount: event.target.setAmount.value
        }

        this.props.submitForm(bet_info);
    }

    getStops = (event) => {
        const bus = event.target.value;
        if (bus !== -1) {
            this.setState({
                route: bus
            });

            axios.get("http://localhost:3001/stops/" 
                    + bus.split(" ")[0] + "/" 
                    + bus.split(" ")[1]
            ).then((response) => {
                if (response) {
                    this.setState({
                        stops: response.data
                    })
                }
                else {
                    this.setState({
                        stops: []
                    })
                }
            });
        }
    }

    setStop = (event) => {
        this.setState({
            stop: event.target.value
        })
    }

    render() {
        return (
            <div className="betForm">
                <h3>Place My Bet</h3>
                <form onSubmit={ this.submitBet }>
                    <section>
                        <label htmlFor="route">Select Route</label>
                        <select value={ this.state.route } onChange={ this.getStops }>
                                <option value="-1">Select route</option>
                        {   
                            this.state.routes.map((data) => (
                                <option value={ data._id.bus_id + " " + data._id.direction } key={ data._id.bus_id + " " + data._id.direction }>
                                    { data._id.bus_id } { data._id.direction }
                                </option>
                            ))
                        }
                        </select>
                    </section>
                    <section>
                        <label htmlFor="stop">Select Stop</label>
                        <select value={ this.state.stop } onChange= { this.setStop }>
                            <option value="-1">Select stop</option>
                        {
                            this.state.stops.map((data) => (
                                <option 
                                    value={data.stop_id} 
                                    key={data.stop_id}
                                >{ data.stop_id }</option>
                            ))
                        }
                        </select>
                    </section>
                    <section>
                        <label htmlFor="amount">Set Amount</label>
                        <input type="number" name="setAmount" min="0"></input>
                    </section>
                    <section>
                        <button className="button primary">Place Bet</button>
                    </section>
                </form>
            </div>
        )
    }
}