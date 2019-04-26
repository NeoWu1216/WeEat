const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const EatingRooms = mongoose.model('EatingRooms');

// POST signup route (optional, everyone has access)
router.post('/signup', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if (!user.name) {
    return res.status(422).json({
      error: "name is required",
    });
  }

  if (!user.email) {
    return res.status(422).json({
      error: "email is required",
    });
  }

  if (!user.password) {
    return res.status(422).json({
      error: "password is required",
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ data: finalUser.toAuthJSON() }))
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    })
});

// POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if (!user.email) {
    return res.status(422).json({
      error: "email is required",
    });
  }

  if (!user.password) {
    return res.status(422).json({
      error: "password is required",
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return res.status(400).json({
        error: 'error while authenticating'
      });
    }

    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ data: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
});

// GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400).json({
          error: "User not found with id " + rid,
        });
      }

      return res.json({ data: user.toAuthJSON() });
    })
    .catch(err => {
      return res.status(500).send({
        error: err
      })
    });
});

// GET user information route (required, only authenticated users have access)
router.get('/:id', auth.required, (req, res) => {
  if (req.query.where) var where = JSON.parse(req.query.where);
  if (req.query.sort) var sort = JSON.parse(req.query.sort);
  if (req.query.select) var select = JSON.parse(req.query.select);
  if (req.query.skip) var skip = JSON.parse(req.query.skip);
  if (req.query.limit) var limit = JSON.parse(req.query.limit);
  if (req.query.count) var count = JSON.parse(req.query.count);

  var tmp = Users.findById(req.params.id).find(where).sort(sort).select(select).skip(skip).limit(limit);
  if (count) tmp = tmp.count();
  tmp.then(user => {
    if (!user || user.length == 0) {
      return res.status(404).send({
        error: "User not found with id " + req.params.id,
      });
    }
    res.status(200).send({
      data: user[0]
    });
  }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        error: err
      });
    }
    return res.status(500).send({
      error: err
    });
  });
});

// Delete a user with the specified id in the request
router.delete('/:id', auth.required, (req, res) => {

  EatingRooms.findByIdAndDelete({ user: req.params.id })
    .then()
    .catch(err => {
      return res.status(500).send({
        error: err,
      });
    })

  Users.findByIdAndRemove(req.params.id)
    .then(user => {
      if (!user || user.length == 0) {
        return res.status(404).send({
          error: "User not found with id " + req.params.id,
        });
      }
      res.status(200).send({
        data: {}
      });
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          error: err,
        });
      }
      return res.status(500).send({
        error: err,
      });
    });
});

// Update a user identified by the id in the request
router.put('/:id', auth.required, (req, res) => {
  // empty body
  if (!req.body) {
    return res.status(400).send({
      error: "Request body can not be empty"
    });
  }
  // case for updating password
  if (req.body.password) {
    Users.findById(req.params.id).then(user => {
      if (!user || user.length == 0) {
        return res.status(404).send({
          error: "User not found with id " + req.params.id
        })
      }
      user.setPassword(req.body.password);
      return user.save()
        .then(() => res.json({ data: user }))
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
  }
  // Find user and update it with the request body
  Users.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true })
    .then(user => {
      if (!user || user.length == 0) {
        return res.status(404).send({
          error: "User not found with id " + req.params.id
        });
      }
      res.status(200).send({
        data: user
      });
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          error: "User not found with id " + req.params.id
        });
      }
      if (err.name === 'ValidationError') {
        return res.status(500).send({
          error: "ValidationError"
        });
      }
      res.status(500).send({
        error: "Internal server error"
      });
    });
});

// for testing purpose
router.get('/', (req, res) => {
  if (req.query.where) var where = JSON.parse(req.query.where);
  if (req.query.sort) var sort = JSON.parse(req.query.sort);
  if (req.query.select) var select = JSON.parse(req.query.select);
  if (req.query.skip) var skip = JSON.parse(req.query.skip);
  if (req.query.limit) var limit = JSON.parse(req.query.limit);
  if (req.query.count) var count = JSON.parse(req.query.count);

  var tmp = Users.find(where).sort(sort).select(select).skip(skip).limit(limit);
  if (count) tmp = tmp.count();
  tmp.then(users => {
    res.status(200).send({
      "data": users
    })
  }).catch(err => {
    res.status(500).send({
      "data": {}
    });
  });
});

module.exports = router;
