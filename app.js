const loaders = require('./loaders');

const startServer = async () => {
  await loaders.init();
}

startServer();
