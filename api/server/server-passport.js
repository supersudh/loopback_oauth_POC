const debug = require('debug')('loopback:authentication');
const flash = require('express-flash');
const loopback = require('loopback');
const loopbackPassport = require('loopback-component-passport');
const providers = require('./providers.json');

module.exports = (app) => {
  // Passport configurators..
  const { PassportConfigurator } = loopbackPassport;
  const passportConfigurator = new PassportConfigurator(app);

  // The access token is only available after boot
  app.middleware('auth', loopback.token({
    model: app.models.accessToken,
  }));

  /**
   * Flash messages for passport
   *
   * Setting the failureFlash option to true instructs Passport to flash an
   * error message using the message given by the strategy's verify callback,
   * if any. This is often the best approach, because the verify callback
   * can make the most accurate determination of why authentication failed.
   */
  app.use(flash());

  passportConfigurator.init();
  passportConfigurator.setupModels({
    userModel: null,
    userIdentityModel: app.models.userIdentity,
    userCredentialModel: app.models.userCredential,
  });

  // attempt to build the providers/passport config
  const providersConfig = app.get('providers');

  // we have some providers configured
  if (providersConfig) {
    Object.keys(providersConfig).forEach((key) => {
      debug(`Configuring authentication provider ${key}`);

      debug(`Validating configuration for provider ${key}`);
      let isValidConfiguration = true;

      Object.keys(providersConfig[key]).forEach((configKey) => {
        if (!providersConfig[key][configKey]) {
          debug(`The configuration ${key}.${configKey} is not set`);
          isValidConfiguration = false;
        }
      });

      if (isValidConfiguration) {
        debug(`Adding authentication provider ${key}`);
        const mergedProvider = Object.assign(
          providers[key],
          providersConfig[key]);
        mergedProvider.session = providers[key].session !== false;
        passportConfigurator.configureProvider(key, mergedProvider);
      } else {
        debug(`Ignoring authentication provider ${key}`);
      }
    });
  }
};
