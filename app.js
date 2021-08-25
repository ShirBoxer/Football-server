const loaders = require('./loaders');

const startServer = async () => {
  await loaders.init();
}


process.on('uncaughtException', (error) => {
  utils.writeLog('error', `An uncaughtException occur ${ error }.`);
});

process.on('unhandledRejection', (error) => {
  utils.writeLog('error',  `An unhandledRejection! promise rejection was not handled ${ error }.`);
});

startServer();
