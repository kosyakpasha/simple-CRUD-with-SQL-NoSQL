var express = require('express');
var router = express.Router();

var UserController = require('./../../db/controllers/userController');
var userErrors = require('./../../db/errors/userErrors');

/* GET users listing. */
router.get('/', function(req, res) {
    UserController.find(req, res);
});

/* GET particular user by ID */
router.get('/:id', function(req, res) {
    UserController.findById(req, res);
});

/* create user */
router.post('/', userErrors.checksArr, function(req, res) {
    UserController.create(req, res);
});

/* update user entry */
router.put('/:id', userErrors.checksArr, function(req, res) {
    UserController.update(req, res);
});

/* delete user entry */
router.delete('/:id', function(req, res) {
    UserController.delete(req, res);
});

/* handle all unsupported methods */
router.all('/', function(req, res) {
    res.send('Request method is not supported');
});

module.exports = router;
