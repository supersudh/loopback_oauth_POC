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

const config = require('../../../server/config.json');
const path = require('path');
const {promisify} = require('util');

module.exports = (User) => {
  // send verification email after registration
  if (config.emailVerificationRequired) {
    User.afterRemote('create', (context, user, next) => {
      const options = {
        type: 'email',
        to: user.email,
        from: config.emailSender,
        subject: config.verifyEmailSubject,
        template: path.join(__dirname, '../../../template/verify.ejs'),
        redirect: '/verified',
        user,
      };

      const verifyUser = promisify(user.verify).bind(user);
      verifyUser(options).catch((err) => {
        User.deleteById(user.id);
        next(err);
      });
    });
  }
};
