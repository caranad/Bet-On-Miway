const fs = require('fs');
const readline = require('readline');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/betonmiway");

const route = new mongoose.Schema(
    { route: Number, route_name: String},
    { collection: 'routes', versionKey: false}
);

const routes = mongoose.model('Routes', route);

const readInterface = readline.createInterface({
    input: fs.createReadStream('../miway_info/routes.txt'),
    output: process.stdout,
    console: false
});

readInterface.on('line', (line) => {
    const kek = line.split(",");
    let data;

    if (kek[0] !== NaN) {
        data = {
            "route": parseInt(kek[0]),
            "route_name": kek[3],
        }
    }

    routes.insertMany([data], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    })
})