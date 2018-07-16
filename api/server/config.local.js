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

module.exports = {
  providers: {
    "google-login": {
      "provider": "google",
      "module": "passport-google-oauth",
      "strategy": "OAuth2Strategy",
      "clientID": "794458670089-elnh814pldi101m67aa4u1v6u07u1nnv.apps.googleusercontent.com",
      "clientSecret": "4DswvBCnOMpERHkrJhEgdg_R",
      "callbackURL": "/auth/google/callback",
      "authPath": "/auth/google",
      "callbackPath": "/auth/google/callback",
      "successRedirect": "/auth/account",
      "failureRedirect": "/login",
      "scope": ["email", "profile"],
      accessType: 'offline',
      prompt: 'consent',
      "failureFlash": true,
      "json": true
    },
    "google-link": {
      "provider": "google",
      "module": "passport-google-oauth",
      "strategy": "OAuth2Strategy",
      "clientID": "794458670089-elnh814pldi101m67aa4u1v6u07u1nnv.apps.googleusercontent.com",
      "clientSecret": "4DswvBCnOMpERHkrJhEgdg_R",
      "callbackURL": "/link/google/callback",
      "authPath": "/link/google",
      "callbackPath": "/link/google/callback",
      "successRedirect": "/auth/account",
      "failureRedirect": "/login",
      "scope": ["email", "profile"],
      "accessType": 'offline',
      "prompt": 'consent',
      "failureFlash": true,
      "json": true
    },
    "local": {
      "provider": "local",
      "module": "passport-local",
      "usernameField": "username",
      "passwordField": "password",
      "authPath": "/auth/local",
      "successRedirect": "/auth/account",
      "failureRedirect": "/local",
      "failureFlash": true
    }
  },
};

