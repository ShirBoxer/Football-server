const envVariables = require('../configs');
const utils = require('../Utils/utils');
const { getApp } = require('../app/express');
const { initServer } = require('../app/server');

const serverListeningHandler = async () => {
    utils.writeLog('info', `Server is listening\nport: ${envVariables.port}\nservice name:${envVariables.service}`);
}

exports.init = async () => {
    let app = getApp();
    let server = initServer(app);
    server.listen(envVariables.port, serverListeningHandler);
}