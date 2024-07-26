'use strict';

export default function calculateOverall(players) {
    return players.reduce((total, player) => total + player.overall, 0) / players.length;
}