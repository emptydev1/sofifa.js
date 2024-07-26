'use strict';

import calculateOverall from './calculateOverall.mjs';
import Constants from '../assets/Constants.mjs';

export default function showdown(challenger, defender) {
    const [ error ] = [ challenger, defender ]
        .map((team) => Constants.TEAM_SCHEMA.validate(team).error)
        .filter(Boolean);
    
    if (error) throw error;
    
    const challengers = Object.values(challenger.lineup).flat();
    const defenders = Object.values(defender.lineup).flat();
    
    const chgOver = calculateOverall(challengers);
    
    return Math.random() < chgOver / (chgOver + calculateOverall(defenders)) ? challenger.id : defender.id;
}