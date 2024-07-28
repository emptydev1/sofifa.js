'use strict';

import calculateOverall from './calculateOverall.mjs';
import Constants from '../assets/Constants.mjs';

const positions = Object.values(Constants.PLAYER_POSITIONS);

export default function showdown(challenger, defender, draw, declineRate) {
    draw = typeof draw === 'number' && draw > 0 && draw <= 1 ? draw : 0.1;
    
    const [ error ] = [ challenger, defender ]
        .map((team) => Constants.TEAM_SCHEMA.validate(team).error)
        .filter(Boolean);
    
    if (error) throw error;
    
    const challengers = Object.values(challenger.lineup).flat();
    const defenders = Object.values(defender.lineup).flat();
    const chgOver = calculateOverall(challengers, declineRate);
    const defOver = calculateOverall(defenders, declineRate);
    const number = Math.random();
    
    return number > draw * (1 - (Math.abs(chgOver - defOver) / Math.max(chgOver, defOver)))
        ? number < chgOver / (chgOver + calculateOverall(defenders))
            ? challenger.id
            : defender.id
        : null;
}