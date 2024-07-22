'use strict';

/* Modules */
exports.retrievePlayers = require('./modules/retrievePlayers');
exports.playerStats = require('./modules/playerStats');
exports.createTeam = require('./modules/createTeam');
exports.getRandomPlayer = require('./modules/getRandomPlayer');
exports.calculateOverall = (players) => players.reduce((total, player) => player.overall, 0) / players.length;

/* Assets */
exports.Constants = require('./assets/Constants');
Object.defineProperty(exports, 'Players', {
    get: () => require('./assets/Players'),
    enumerable: true
});