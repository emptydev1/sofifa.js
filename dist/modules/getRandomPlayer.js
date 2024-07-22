'use strict';

const retrievePlayers = require('./retrievePlayers');
const Constants = require('../assets/Constants');
const playerStats = require('./playerStats');

module.exports = async function getRandomPlayer(min, max, prob = 1.3) {
    const overalls = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const weights = overalls
        .map((overall) => 1 / Math.pow(overall + 1, prob))
        .reduce((arr, weight, index) => (arr[index] = (arr.length > 0 ? arr.slice(-1).at(0) : 0) + weight, arr), []);
    const cumulative = weights.map((weight) => weight / weights.slice(-1).at(0));
    const number = Math.random();
    const players = await retrievePlayers({ oah: overalls[cumulative.findIndex((value) => value > number)], oal: min });
    const player = players.sort(() => Math.random() - 0.3)[Math.floor(Math.random() * players.length)];
    
    return player?.id ? playerStats(null, player.id) : null;
};