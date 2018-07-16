/**
 * Copyright © 2018 Gigster, Inc. All Rights Reserved.
 *
 * This software and/or related documentation, is protected by copyright and
 * other intellectual property laws, and Gigster and/or its licensors, as
 * applicable, own all right, title and interest in and to its content, and all
 * derivatives, translations, adaptations and combinations of the foregoing. You
 * are not permitted to copy, distribute, transmit, store, display, perform,
 * reproduce, publish, license, create derivative works from, transfer, sell, or
 * make any other use of this software and/or related documentation unless you
 * have entered into a written agreement with Gigster regarding such usage. You
 * agree that all such usage of the software and/or related documentation shall
 * be subject to the terms and conditions of such written agreement, including
 * all applicable license restrictions.
 */

// HACK(mark): These modules are lazily required and cause problems for jest.
// Requiring them in the boot script alleviates this problem.
require('../server-passport');
require('loopback-component-passport');
require('express-flash');
require('passport-local');

require('../server-web');
require('cookie-parser');
require('express-session');
require('connect-ensure-login');

module.exports = function enableAuthentication(server) {
  // enable authentication
  server.enableAuth();
};
