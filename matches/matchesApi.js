const express = require('express');
const matchController = require('./matchesController');

let router = express.Router();

router.get('/teams/:name', matchController.getMatchesByName);
router.get('/teams/:name/:choosenStatus', matchController.getMatchesByNameAndStatus);
router.get('/tournament/:name', matchController.getMatchesByName);
router.get('/tournament/:name/:choosenStatus', matchController.getMatchesByNameAndStatus);

module.exports = router;