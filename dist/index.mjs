'use strict';

/* Modules */
import calculateOverall from './modules/calculateOverall.mjs';
import retrievePlayers from './modules/retrievePlayers.mjs';
import getRandomPlayer from './modules/getRandomPlayer.mjs';
import playerStats from './modules/playerStats.mjs';
import createTeam from './modules/createTeam.mjs';
import showdown from './modules/showdown.mjs';

export {
    calculateOverall, retrievePlayers,
    getRandomPlayer, playerStats,
    createTeam, showdown
};

/* Assets */
import Players from './assets/Players.json' assert { type: 'json' };
import Constants from './assets/Constants.mjs';

export { Constants, Players };