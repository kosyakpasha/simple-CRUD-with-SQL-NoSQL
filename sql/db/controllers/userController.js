var expressValidator = require('express-validator');

var models = require('./../../db/models');
var userErrors = require('./../../db/errors/userErrors');

var UserController = {
  find(req, res) {
    var whereObj = req.query.searchBy ? { [req.query.searchBy]: [req.query.searchValue] } : null;
    models.User.findAndCountAll({
      limit: req.query.perPage,
      offset: req.query.perPage * (req.query.offset - 1),
      order: [[req.query.sortBy, req.query.sortDir]],
      where: whereObj,
    }).then(({ count, rows }) => {
      var newUsers = {
        collection: rows,
        total: count,
      };

      res.status(200).json(newUsers);
    }).catch(err => {
      res.status(500).json(err);
    });
  },

  findById(req, res) {
    models.User.findByPk(req.params.id).then(user => {
      res.status(200).json(user);
    }).catch(err => {
      res.status(500).json(err)
    });
  },

  create(req, res) {
    var errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
      var invalidDataResponse = errors.array().map(errorObj => {
        return userErrors.errorTemplate(errorObj);
      });

      return res.status(500).json({ errors: invalidDataResponse });
    }

    models.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      company: req.body.company,
      position: req.body.position,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    }).then(user => {
      res.status(200).json(user);
    }).catch(err => {
      res.status(500).json(err);
    });
  },

  update(req, res) {
    var errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
      var invalidDataResponse = errors.array().map(errorObj => {
        return userErrors.errorTemplate(errorObj);
      });

      return res.status(500).json({ errors: invalidDataResponse });
    }

    models.User.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(user => {
      res.status(200).json(user);
    }).catch(err => {
      res.status(500).json(err)
    });
  },

  delete(req, res) {
    models.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => {
      res.status(200).json({ status: 'ok' });
    }).catch(err => {
      res.status(500).json(err)
    });
  }
};

module.exports = UserController;
