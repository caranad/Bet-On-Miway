const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const db = require('./models/models');

const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const request = require('request');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyparser.json());
app.use(cors());

var requestSettings = {
    method: 'GET',
    url: 'https://www.miapp.ca/GTFS_RT/TripUpdate/TripUpdates.pb',
    encoding: null
};

app.get('/trackBets', (req, res) => {
    res.header("Content-Type",'application/json');

    db.bets.find({ user_id: "aranadic" }).then((data) => {
        if (data.length === 0) {
            res.send("Nothing");
        }
        else {
            let stop_info = [];
            const now = new Date();

            request(requestSettings, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
                    let st = {}
                    
                    for (let i = 0; i < data.length; i++) {
                        const filteredSchedule = feed.entity.filter((x) => {
                            return x.tripUpdate.trip.routeId === data[i].bus_id;
                        })
    
                        let ss;
    
                        for (let j = 0; j < filteredSchedule.length; j++) {
                            const stops = filteredSchedule[j].tripUpdate.stopTimeUpdate;
    
                            const kek = stops.filter((x) => {
                                return x.stopId === data[i].stop_id
                            })
    
                            if (kek.length > 0) {
                                ss = kek[0];

                                st = {
                                    bus: data[i].bus_id,
                                    stop: data[i].stop_id,
                                    direction: data[i].direction,
                                    trip_id: filteredSchedule[j].id,
                                    dep_hour: new Date(parseInt(ss.departure.time) * 1000).getHours(),
                                    dep_minute: new Date(parseInt(ss.departure.time) * 1000).getMinutes()
                                }
                                
                                stop_info.push(st);
                                break;
                            }
                        }
                    }

                    for (let i = 0; i < stop_info.length; i++) {
                        if (now.getHours() === stop_info[i].dep_hour) {
                            // Only one minute until arrival!
                            if (stop_info[i].dep_minute - now.getMinutes() === 1) {
                                // Check - does departure time match with what the expected arrival time?
                                db.stop_times.find({ 
                                    trip_id: stop_info[i].trip_id, 
                                    stop_id: stop_info[i].stop }, { _id: 0, departure_time: 1 })
                                .then((data) => {
                                    const time = data[0].departure_time;
                                    const hour = parseInt(time.split(":")[0])
                                    const minute = parseInt(time.split(":")[1]);

                                    if (!(stop_info[i].dep_hour == hour && stop_info[i].dep_minute == minute)) {
                                        // emit late response
                                        stop_info[i].late = true;
                                    }
                                    else {
                                        stop_info[i].late = false;
                                    }

                                    if (stop_info[i].late) {
                                        // TODO: Pay the user however much they bet
                                        console.log("Pay out!");
                                    }

                                    // Remove bet from queue
                                    db.bets.deleteOne({
                                        bus_id: stop_info[i].bus,
                                        stop_id: stop_info[i].stop,
                                        direction: stop_info[i].direction
                                    }, (err) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                    })
                                })
                            }
                        }
                    }

                    res.send(JSON.stringify(stop_info, null, 4));
                }
            })
        }
    })
});

app.post('/bet', (req, res) => {
    db.bets.find({ 
        user_id: "aranadic", 
        bus_id: req.body.bet.bus_id, 
        direction: req.body.bet.direction, 
        stop_id: req.body.bet.stop_id
    }).then((data) => {
        if (data.length > 0) {
            res.send({
                "err": "You have already placed a bet on that stop. Please select another stop."
            });
        }
        else {
            db.bets.insertMany([req.body.bet], (err, data) => {
                if (err) {
                    res.send({
                        "err": "Something wrong happened."
                    });
                }
                else {
                    res.send({
                        "success": "Successfully added your bet. Good luck!"
                    });
                }
            });
        }
    })
})

app.get('/bets/:user', (req, res) => {
    db.bets.find({ user_id: req.params.user }).then((data) => {
        res.send(JSON.stringify(data, null, 4));
    })
})

app.get('/stops/:bus/:direction', (req, res) => {
    res.header("Content-Type",'application/json');

    db.trips.find({ 
        bus_id: req.params.bus, 
        direction: req.params.direction 
    }).then((data) => {
        const randomRoute = data[0].trip_id;

        db.stop_times.find({ 
            trip_id: randomRoute
        }, { stop_id: 1, _id: 0}).then((data) => {
            res.send(JSON.stringify(data, null, 4))
        })
    })
});

app.get('/routes', (req, res) => {
    db.trips.aggregate([ 
        {
            "$group": { 
                "_id": { 
                    bus_id: "$bus_id", 
                    direction: "$direction" 
                } 
            } 
        } 
    ]).then((data) => {
        res.send(JSON.stringify(data, null, 4));
    })
})

app.get('/stops', (req, res) => {
    db.stops.find({}).then((data) => {
        res.send(data);
    })
})

app.use(cors());
app.use(bodyparser.json());

app.listen(PORT, () => {
    console.log("Started server from PORT");
})