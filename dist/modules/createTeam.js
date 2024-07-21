'use strict';

const { PLAYER_POSITIONS } = require('../assets/Constants');

module.exports = function createTeam(name) {
    const Players = require('../assets/Players').sort(() => Math.random() - 0.3);
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
            goalkeeper: retrievePlayer(PLAYER_POSITIONS.Goalkeeper),
            forwards: Array.from({ length: 3 }, () => retrievePlayer(PLAYER_POSITIONS.Attack)),
            defenders: Array.from({ length: 4 }, () => retrievePlayer(PLAYER_POSITIONS.Defense)),
            midfielders: Array.from({ length: 4 }, () => retrievePlayer(PLAYER_POSITIONS.Center)),
            inventory: Array.from({ length: 3 }, () => retrievePlayer())
        },
        get overall() {
            const players = [ 
                ...this.lineup.forwards,
                ...this.lineup.defenders,
                ...this.lineup.midfielders,
                ...this.lineup.inventory
            ];
                
            return (this.lineup.goalkeeper.overall + players.reduce((a, b) => a + b.overall, 0)) / players.length;
        }
    };
    
    return team;
};