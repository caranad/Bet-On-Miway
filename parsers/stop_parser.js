const fs = require('fs');
const readline = require('readline');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/betonmiway");

const stop = new mongoose.Schema(
    { stop_id: String, stop_name: String, stop_lat: String, stop_lon: String },
    { collection: 'stops', versionKey: false}
);

const stops = mongoose.model('Stops', stop);

const readInterface = readline.createInterface({
    input: fs.createReadStream('../miway_info/stops.txt'),
    console: false
});

readInterface.on('line', (line) => {
    const kek = line.split(",");
    let data;

    if (kek[0] !== "stop_id") {
        data = {
            "stop_id": kek[0],
            "stop_name": kek[2],
            "latitude": kek[4],
            "longitude": kek[5]
        }
    }

    stops.insertMany([data], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    })
})