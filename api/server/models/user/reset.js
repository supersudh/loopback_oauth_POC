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

const debug = require('debug')('loopback:authentication');
const config = require('../../../server/config.json');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const {promisify} = require('util');

module.exports = (User) => {
  // send password reset link when requested
  User.on('resetPasswordRequest', (info) => {
    const templateFilePath = path.join(__dirname, '../../../template/reset.ejs');

    const templateString = fs.readFileSync(templateFilePath, 'utf8');
    const html = ejs.render(templateString, {
      host: config.host,
      port: config.port,
      accessToken: process.env.AUTH_RESET_REDIRECT_ID || info.accessToken.id,
    });

    const sendEmail = promisify(User.app.models.Email.send).bind(User.app.models.Email);

    sendEmail({
      to: info.email,
      from: config.emailSender,
      subject: config.resetEmailSubject,
      html,
    }).then(() => debug('> sending password reset email to:', info.email))
      .catch(() => debug('> error sending password reset email'));
  });
};
