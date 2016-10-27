var express = require('express');
var ctrl = require('./../controllers/index');

var router = express.Router();

/* GET home page. */
router.get('/', ctrl.index);

module.exports = router;
