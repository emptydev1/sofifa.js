'use strict';

const calculateOverall = require('./calculateOverall');
const Constants = require('../assets/Constants');

const positions = Object.values(Constants.PLAYER_POSITIONS);

module.exports = function showdown(challenger, defender, draw, declineRate) {
    draw = typeof draw === 'number' && draw > 0 && draw <= 1 ? draw : 0.1;
    
    const [ error ] = [ challenger, defender ]
        .map((team) => Constants.TEAM_SCHEMA.validate(team).error)
        .filter(Boolean);
    
    if (error) throw error;
    
    const challengers = Object.values(challenger.lineup).flat();
    const defenders = Object.values(defender.lineup).flat();
    const chgOver = calculateOverall(challengers, declineRate);
    const defOver = calculateOverall(defenders, declineRate);
    const totalOverall = chgOver + defOver;
    const number = Math.random();
    
    return number > draw * (1 - (Math.abs(chgOver - defOver) / Math.max(chgOver, defOver)))
        ? (chgOver / totalOverall) / ((chgOver / totalOverall) + (defOver / totalOverall)) > number
            ? challenger.id
            : defender.id
        : null;
};