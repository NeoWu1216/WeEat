const mongoose = require('mongoose');
const router = require('express').Router();
const EatingRooms = mongoose.model('EatingRooms');

// create eating room
router.post('/', (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            "message": "Error: empty body",
            "data": {}
        });
    }

    // create new task
    const eatingroom = new EatingRooms({
        title: req.body.title,
        date: req.body.title.date,
        address: req.body.title.address,
        restaurant: req.body.title.restaurant,
        party_size: req.body.title.party_size,
    });

    eatingroom.save()
        .then(data => {
            res.status(201).json({
                "message": "Created",
                "data": data
            });
        }).catch(err => {
            res.status(500).json({
                "message": "Internal server error.",
                "data": {}
            });
        });
});


// get all eating rooms
router.get('/', (req, res) => {
    if (req.query.where) var where = JSON.parse(req.query.where);
    if (req.query.sort) var sort = JSON.parse(req.query.sort);
    if (req.query.select) var select = JSON.parse(req.query.select);
    if (req.query.skip) var skip = JSON.parse(req.query.skip);
    if (req.query.limit) var limit = JSON.parse(req.query.limit);
    if (req.query.count) var count = JSON.parse(req.query.count);

    var tmp = EatingRooms.find(where).sort(sort).select(select).skip(skip).limit(limit);
    if (count) tmp = tmp.count();
    tmp.then(data => {
        res.status(200).json({
            "message": "OK",
            "data": data
        })
    }).catch(err => {
        res.status(500).json({
            "message": "Some error occurred while retrieving tasks.",
            "data": {}
        });

    });
});

module.exports = router;
