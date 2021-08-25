const expressApp = require("../app/express");
const envVariables = require('../configs'); //??

//TODO
// const { writeLog, send } = require('../Utils/utils');

const matchesApi = require('../matches/matchesApi');

exports.init = async () => {
    let app = expressApp.getApp();
    app.use('/matches', matchesApi);
}