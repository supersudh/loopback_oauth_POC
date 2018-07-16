global.log = console.log;
require('dotenv').config();

const loopback = require('loopback');
const boot = require('loopback-boot');
const serverPassport = require('./server-passport');
const serverWeb = require('./server-web');

const app = loopback();
module.exports = app;

app.start = () => {
  // start the web server
  return app.listen(() => {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');

    // eslint-disable-next-line no-console
    console.log('Web server listening at: %s', baseUrl);

    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;

      // eslint-disable-next-line no-console
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err) => {
  if (err) throw err;
  serverPassport(app);
  if (app.get('webEnabled')) serverWeb(app);
  app.get('/link/google/callback', (req, res, next) => {
    log('AM HERE /link/google/callback');
    log(req.user);
    log("************************************************ BEGIN REQ");
    log(req);
    log("************************************************ END REQ");
  });

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start();
  }
});
