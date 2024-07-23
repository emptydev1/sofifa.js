'use strict';

/* Modules */
import retrievePlayers from './modules/retrievePlayers.mjs';
import playerStats from './modules/playerStats.mjs';
import createTeam from './modules/createTeam.mjs';
import getRandomPlayer from './modules/getRandomPlayer.mjs';

export { retrievePlayers, playerStats, createTeam, getRandomPlayer };

export const calculateOverall = (players) => players.reduce((total, player) => total + player.overall, 0) / players.length;

/* Assets */
import Constants from './assets/Constants.json' assert { type: 'json' };
import Players from './assets/Players.json' assert { type: 'json' };

export { Constants, Players };