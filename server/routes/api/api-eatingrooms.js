const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const EatingRooms = mongoose.model('EatingRooms');
const Users = mongoose.model('Users');


// create eating room
router.post('/', auth.required, (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      data: {}
    });
  }
  const { payload: { id } } = req;
  // create new task
  const eatingroom = new EatingRooms({
    user: id,
    title: req.body.title,
    date: req.body.date,
    address: req.body.address,
    restaurant: req.body.restaurant,
    party_size: req.body.party_size,
    participants: req.body.participants,
    image_url: req.body.image_url
  });
  // add the eating room to user's list
  Users.findByIdAndUpdate(id,
    {
      $push: { eatingrooms: eatingroom._id }
    })
    .then()
    .catch()

  eatingroom.save()
    .then(data => {
      res.status(201).json({
        data: data
      });
    }).catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// Delete an eating room
router.delete('/:id', auth.required, (req, res) => {
  const { payload: { id } } = req;

  // delete other people's eating room detection
  EatingRooms.findById(req.params.id)
    .then(eatingroom => {
      if (eatingroom.user != id) {
        throw "You r deleting someone else's eating room!";
      }
    }).then(()=>{
      Users.findByIdAndUpdate(id,
        {
          $pull: { eatingrooms: req.params.id }
        })
    }).then(()=>{
      EatingRooms.findByIdAndRemove(req.params.id)
      .then(eatingroom => {
        if (!eatingroom || eatingroom.length == 0) {
          throw "not found"
        }
        res.status(200).send({
          data: {}
        });
      })
    }).catch(err => {
      if (err == "not found") {
        res.status(404).send({
          error: "eatingroom not found with id " + req.params.id,
        });
      }
      else {
        res.status(500).json({
          error: err
        });
      }
    })

  
});


// Update a eatingroom
router.put('/:id', auth.required, (req, res) => {
  const { payload: { id } } = req;

  // editing other people's eating room detection
  EatingRooms.findById(req.params.id)
    .then(eatingroom => {
      if (eatingroom.user != id) {
        return res.status(500).send({
          error: "You r editing someone else's eating room!",
        });
      }
    })
    .catch(err => {
      return res.status(500).send({
        error: err,
      });
    })
  // empty body
  if (!req.body) {
    return res.status(400).send({
      error: "Request body can not be empty"
    });
  }
  // Find user and update it with the request body
  EatingRooms.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true })
    .then(eatingroom => {
      if (!eatingroom || eatingroom.length == 0) {
        return res.status(404).send({
          error: "eatingroom not found with id " + req.params.id
        });
      }
      res.status(200).send({
        data: eatingroom
      });
    }).catch(err => {
      res.status(500).send({
        error: err
      });
    });
});


router.post('/join/:id', auth.required, (req, res)=> {
  const { payload: { id } } = req;
  EatingRooms.findById(req.params.id)
    .then(eatingroom => {
      let participants = eatingroom.participants
      if (!participants) participants = []
      if (participants.find(x=>x==id)) {
        throw "You already joined"
      }
      if (participants.length === eatingroom.party_size) {
        throw "the room is full"
      }
      participants.push(id)
      return Users.findByIdAndUpdate(id,
        {
          $push: { eatingrooms: eatingroom._id }
        })
        .then(()=>participants)
  }).then((participants)=> {
      EatingRooms.findByIdAndUpdate(req.params.id, { $set: {participants: participants}}, { new: true, runValidators: true })
      .then(eatingroom => {
        if (!eatingroom || eatingroom.length == 0) {
          throw ("eatingroom not found with id " + req.params.id)
        }
        res.status(200).send({
          data: eatingroom
        });
      })
    })
    .catch(err => {
      res.status(500).send({
        error: err,
      });
    })
  
})

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
      data: data
    })
  }).catch(err => {
    res.status(500).json({
      error: "Some error occurred while retrieving tasks."
    });

  });
});

module.exports = router;
