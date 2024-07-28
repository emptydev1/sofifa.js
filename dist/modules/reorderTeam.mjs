'use strict';

import Constants from '../assets/Constants.mjs';
import getFormation from './getFormation.mjs';
import merge from 'lodash/merge.js';

export default function reorderTeam(formation, team) {
    const { error } = Constants.TEAM_SCHEMA.validate(team);
    
    if (error) throw error;
    
    const options = getFormation(formation);
    
    if (typeof options !== 'object') throw new TypeError('Cannot parse the formation to a object');
    
    const players = Object.values([
        ...team.lineup.forwards,
        ...team.lineup.defenders,
        ...team.lineup.midfielders
    ]).flat();
    
    if (Object.values(options).reduce((total, item) => total + item, 0) < players.length) throw new TypeError('Formation has fewer positions than available players');
    
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
}