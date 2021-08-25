const dotenv = require('dotenv');
dotenv.config();

let staticEnvVariables = {
    port: process.env.PORT || 8080,
    ENV: process.env.ENV || 'TEST',
    service: process.env.service || 'Football'
};

module.exports = staticEnvVariables;