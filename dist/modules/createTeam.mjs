'use strict';

import { readFileSync } from 'node:fs';
import Constants from '../assets/Constants.json' assert { type: 'json' };
import path from 'node:path';

export default async function createTeam(name) {
    const Players = await import('../assets/Players.json', { assert: { type: 'json' }})
        .then((metadata) => metadata.default
            .sort(() => Math.random() - 0.3));
    const retrievePlayer = (position) => {
        const choices = position
            ? Players.filter(
                (player) => 
                    player.positions.some((p) => position.acronyms.includes(p)))
            : Players;
        const choice = choices[Math.floor(Math.random() * choices.length)];
        
        return Players.splice(Players.findIndex((player) => 
                player.id === choice.id), 1)[0];
    };
    const team = {
        name: typeof name === 'string' ? name.split(/\s+/).map((part) => part[0].toUpperCase() + part.slice(1)) : name,
        creationDate: new Date().getTime(),
        lineup: {
            goalkeeper: retrievePlayer(Constants.PLAYER_POSITIONS.Goalkeeper),
            forwards: Array.from({ length: 3 }, () => retrievePlayer(Constants.PLAYER_POSITIONS.Attack)),
            defenders: Array.from({ length: 4 }, () => retrievePlayer(Constants.PLAYER_POSITIONS.Defense)),
            midfielders: Array.from({ length: 4 }, () => retrievePlayer(Constants.PLAYER_POSITIONS.Center)),
            inventory: Array.from({ length: 3 }, () => retrievePlayer())
        }
    };
    
    return team;
};