'use strict';

import Constants from '../assets/Constants.mjs';

const positions = Object.values(Constants.PLAYER_POSITIONS);

export default function calculateOverall(players, declineRate) {
    if (players.some((player) => Constants.PLAYER_SCHEMA.validate(player).error)) throw new TypeError('Failed to parse players data');
    
    declineRate = typeof declineRate === 'number' && declineRate > 0 && declineRate < 1 ? declineRate : 0.10;
    
    return players.reduce((total, player) => {
        const position = positions.find((pos) => pos.acronyms.includes(player.position));
        
        if (!position || player.positions.some((pos) => position.acronyms.includes(pos))) return total + player.overall;
        
        const percent = positions
            .some((pos) => pos.acronyms.includes(player.position) && position._id === pos._id)
                ? declineRate / 2
                : declineRate;
        
        return total + Math.max(0, player.overall * (1 - percent));
    },
    0) / players.length;
}