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

/*
 * @see http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-autoupdate
 */
// Libraries
const {promisify} = require('util');
const debug = require('debug')('loopback:models');

// Project
const server = require('../server/server.js');
const {generateDataSources} = require('./utils');

debug(`Updating the databases`);

// listen for the Loopback `booted` event for the server.
server.on('booted', async () => {
  debug(`Loopback server booted`);

  // datasources names is provided by the gig.yaml
  const datasources = generateDataSources(server);
  await Promise.all(datasources.map(async (name) => {
    const datasource = server.dataSources[name];
    if (datasource) {
      debug(`Updating database for datasource ${name}`);
      const actual = await promisify(datasource.isActual).bind(datasource)();
      if (actual) {
        debug(`Nothing to update for datasource ${name}`);
        await promisify(datasource.disconnect).bind(datasource)();
      } else {
        debug('Changes detected, updating the database');
        try {
          await promisify(datasource.autoupdate).bind(datasource)();
        } catch (error) {
          debug(`An error occured updating the database ${error}`);
          throw error;
        }
        debug('Database update done');
        await promisify(datasource.disconnect).bind(datasource)();
      }
    }
  }));

  debug(`Done updating the databases`);
  process.exit();
});
