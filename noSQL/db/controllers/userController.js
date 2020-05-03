var User = require('./../../db/models/User');

function reqCb(err, res, data) {
  if (err) {
    res.status(500).json(err);
  }

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(200).json();
  }
}

var UserController = {
  find(req, res) {
    try {
      var selectObj = req.query.searchValue ? { [req.query.sortBy]: req.query.searchValue } : null;
      var options = {
        offset: req.query.perPage * (req.query.offset - 1),
        limit: req.query.perPage,
        sort: { [req.query.sortBy]: req.query.sortDir },
        lean: true,
        leanWithId: true,
      };
      User.paginate(selectObj, options, function(err, users) {
        if (err) {
          res.status(500).json(err);
        }
        var newUsers = {
          collection: users.docs,
          total: users.totalDocs,
        };
        res.status(200).json(newUsers);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  findById(req, res) {
    try {
      User.findById(req.params.id, function(err, user) {
        reqCb(err, res, user);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  create(req, res) {
    try {
      var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        company: req.body.company,
        position: req.body.position,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
      });

      user.save({}, function (err) {
        reqCb(err, res);
      })
    } catch (err) {
      res.status(500).json(err);
    }
  },

  update(req, res) {
    try {
      var id = req.params.id;
      var updatedUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        company: req.body.company,
        position: req.body.position,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
      };

      User.updateOne({ _id: id }, updatedUser, { runValidators: true }, function(err) {
        reqCb(err, res);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  delete(req, res) {
    try {
      User.deleteOne({ _id: req.params.id }, function(err) {
        reqCb(err, res);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = UserController;
