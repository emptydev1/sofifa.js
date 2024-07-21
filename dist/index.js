'use strict';

/* Modules */
exports.retrievePlayers = require('./modules/retrievePlayers');
exports.playerStats = require('./modules/playerStats');
exports.createTeam = require('./modules/createTeam');

/* Assets */
exports.Constants = require('./assets/Constants');
Object.defineProperty(exports, 'Players', {
    get: () => require('./assets/Players'),
    enumerable: true
});