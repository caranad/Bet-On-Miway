const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/betonmiway");

const route = new mongoose.Schema(
    { route: Number, route_name: String},
    { collection: 'routes', versionKey: false}
);

const stop = new mongoose.Schema(
    { stop_id: String, stop_name: String, stop_lat: String, stop_lon: String },
    { collection: 'stops', versionKey: false}
);

const trip = new mongoose.Schema(
    { bus_id: String, trip_id: String, direction: String },
    { collection: 'trips', versionKey: false}
);

const stop_time = new mongoose.Schema(
    { trip_id: String, arrival_time: String, departure_time: String, stop_id: String },
    { collection: 'trip_stops', versionKey: false}
);

const user_bets = new mongoose.Schema(
    { user_id: String, amount: String, bus_id: String, direction: String, stop_id: String },
    { collection: 'bets', versionKey: false}
);

const stops = mongoose.model('Stops', stop);
const routes = mongoose.model('Routes', route);
const trips = mongoose.model('Trips', trip);
const stop_times = mongoose.model('TripStops', stop_time);
const bets = mongoose.model('Bets', user_bets);

module.exports = {
    stops: stops,
    routes: routes,
    trips: trips,
    stop_times: stop_times,
    bets: bets
}