'use strict';

const Constants = require('../assets/Constants');
const getFormation = require('./getFormation');
const path = require('node:path');

module.exports = async function createTeam(name, options = {}) {
    options = Object.assign(
        {
            midfielders: 3, defenders: 4, 
            inventory: 3, forwards: 3
        },
        getFormation(options) || {}
    );
    
    if (typeof name !== 'string') throw new TypeError(`The 'name' parameter must be a string. Received: ${typeof name}`);
    if (!Object.values(options).every((value) => Number.isInteger(value) && value > 0 && value < 8)) throw new TypeError(`All options must be an integer that falls between the ranges of 1 and 7, however, the "${Object.entries(options).find(([_, value]) => !Number.isInteger(value) || value < 0 || value > 8 || !value).at(0)}" option doesn't follow this pattern`);
    
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
    
    return {
        id: Math.random().toString(16).slice(2),
        name: name
            .split(/\s+/)
            .map((part) => part[0].toUpperCase() + part.slice(1))
            .join(' '),
        creationDate: new Date().getTime(),
        lineup: {
            goalkeeper: retrievePlayer(Constants.PLAYER_POSITIONS.Goalkeeper),
            defenders: Array.from(
                { length: options.defenders },
                () => retrievePlayer(Constants.PLAYER_POSITIONS.Defense)
            ),
            midfielders: Array.from(
                { length: options.midfielders },
                () => retrievePlayer(Constants.PLAYER_POSITIONS.Midfielder)
            ),
            forwards: Array.from(
                { length: options.forwards },
                () => retrievePlayer(Constants.PLAYER_POSITIONS.Forward)
            )
        },
        inventory: Array.from({ length: options.inventory }, () => retrievePlayer())
    };
};