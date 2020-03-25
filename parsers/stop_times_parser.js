const fs = require('fs');
const readline = require('readline');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/betonmiway");

const stop_time = new mongoose.Schema(
    { trip_id: String, arrival_time: String, departure_time: String, stop_id: String },
    { collection: 'trip_stops', versionKey: false}
);

const stops = mongoose.model('TripStops', stop_time);

const readInterface = readline.createInterface({
    input: fs.createReadStream('../miway_info/stop_times.txt'),
    console: false
});

const push = []

readInterface.on('line', (line) => {
    const kek = line.split(",");
    let data;

    if (kek[0] !== "trip_id") {
        data = {
            "trip_id": kek[0],
            "arrival_time": kek[1],
            "departure_time": kek[2],
            "stop_id": kek[3]
        }

        push.push(data);
    }
})

readInterface.on('close', () => {
    console.log("Completed: ");

    for (let i = 0; i < 50000; i++) {
        stops.insertMany([push[i]], (err, data) => {
            console.log("Success: ", i);
        })
    }
})