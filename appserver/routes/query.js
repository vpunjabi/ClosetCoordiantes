var express = require('express');
var ctrlAPI = require('./../controllers/query');

var router = express.Router();

/* GET api request. */
router.get('/', ctrlAPI.getCoordinates, ctrlAPI.getSortedCoordinates);

module.exports = router;
