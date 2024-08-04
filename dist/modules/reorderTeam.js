'use strict';

const { merge } = require('lodash');
const Constants = require('../assets/Constants');
const getFormation = require('./getFormation');

module.exports = function reorderTeam(formation, team) {
    const { error } = Constants.TEAM_SCHEMA.validate(team);
    
    if (error) throw error;
    
    const options = getFormation(formation);
    
    if (typeof options !== 'object') throw new TypeError('Cannot parse the formation to a object');
    
    const players = Object.values([
        ...team.lineup.defenders,
        ...team.lineup.midfielders,
        ...team.lineup.forwards
    ]).flat();
    
    if (Object.values(options).reduce((total, item) => total + item, 0) < players.length) throw new RangeError('Formation has fewer positions than available players');
    
    team.lineup = Object.assign(team.lineup, { defenders: [], midfielders: [], forwards: [] });
    
    return merge(
        team,
        {
            lineup: {
                defenders: Array.from(
                    { length: options.defenders },
                    (_, i) => players[i]
                ),
                midfielders: Array.from(
                    { length: options.midfielders },
                    (_, i) => players[i + options.defenders]
                ),
                forwards: Array.from(
                    { length: options.forwards },
                    (_, i) => players[i + options.midfielders + options.defenders]
                )
            }
        }
    );
};