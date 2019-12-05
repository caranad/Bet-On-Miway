const fs = require('fs');
const readline = require('readline');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/betonmiway");

const trip = new mongoose.Schema(
    { bus_id: String, trip_id: String, direction: String },
    { collection: 'trips', versionKey: false}
);

const trips = mongoose.model('Trips', trip);

const readInterface = readline.createInterface({
    input: fs.createReadStream('../miway_info/trips.txt'),
    console: false
});

readInterface.on('line', (line) => {
    const kek = line.split(",");
    let data;

    if (kek[0] !== "bus_id") {
        data = {
            "bus_id": kek[0],
            "trip_id": kek[2],
            "direction": kek[3],
        }
    }

    trips.insertMany([data], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    })
})