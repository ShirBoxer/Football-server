const http = require('http');
const envVariables = require('../configs');
const port = envVariables.PORT || '8080';

exports.initServer = (app) => {
    if (!app)
        throw new Error('App not initialized!');

    app.set('port', port);
    server = http.createServer(app);

    return server;
}

exports.getServer = () => {
    if (!server)
        throw new Error('Server not initialized!');

    return server;
}