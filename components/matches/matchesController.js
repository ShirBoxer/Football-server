const utils = require('../../Utils/utils');
const matchesService = require('./matchesService');
const _ = require('lodash');

exports.getMatchesByName = async (req, res, next) => {
    const { name }= req.params;
    const matches = matchesService.getMatchesByName(name);
    if(!matches || matches.length == 0)
        matches = ["Zero matches was found"]
    utils.send(res, next, matches);
    return;
}

exports.getMatchesByNameAndStatus = async (req, res, next) => {
    const { name, choosenStatus } = req.params;
    const matches = matchesService.getMatchesByNameAndStatus(name, choosenStatus);
    if(!matches || matches.length == 0)
        matches = ["Zero matches was found"]
    utils.send(res, next, matches);
    return;
}

