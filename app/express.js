const express = require('express');


const envVariables = require('../configs');

let app;
/**
 * 
 * @returns {import 'express'.Application;}
 * 
 */
exports.initApp = () => {
    if (!app) {
        app = express();
        app.set('port', envVariables.port);
    }

    return app;
}

/**
 * 
 * @returns {import 'express'.Application;}
 * 
 */
exports.getApp = () => {
    if (!app)
        throw new Error('App not initialized!');

    return app;
}