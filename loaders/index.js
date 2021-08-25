const express = require('./express');
const server = require('./server');

exports.init = async () => {
    await express.init();
    await server.init();
};