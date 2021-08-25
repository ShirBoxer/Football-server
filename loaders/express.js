const _ = require('lodash');
const compression = require('compression');
const { initApp } = require('../app/express');
const routing = require('./routing');
const utils = require('../Utils/utils');

exports.init = async () => {
    const app = initApp();

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.header("Content-Type", "application/json; charset=utf-16");
        res.header('charset', 'utf-16');

        next();
    });

    app.use(compression());

    app.get('/', function (req, res, next) { res.send('Welcome to Football API server'); next(); });

    routing.init();
};
