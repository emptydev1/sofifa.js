<h1 align="center">showdown</h1>

Calculates the probability of a football match outcome between two teams, considering the chance of a draw.

## Parameters

- **`challenger`** (`Object`): Team object representing the challenger. Must conform to `<Object>.Constants.TEAM_SCHEMA`.
- **`defender`** (`Object`): Team object representing the defender. Must conform to `<Object>.Constants.TEAM_SCHEMA`.
- **`draw`** (`number`, optional): Probability of the match ending in a draw. Must be between 0 and 1. Defaults to `0.1`.
- **`declineRate`** (`number`, optional): Rate at which player ratings decline based on their position. Must be between 0 and 1.

## Parameters Validation

- Both `challenger` and `defender` must conform to the `<Object>.Constants.TEAM_SCHEMA` schema.
- The `draw` parameter must be a number between 0 and 1. If invalid, defaults to `0.1`.
- The `declineRate` must be a number between 0 and 1.

## Returns

Returns `string` representing the ID of the winning team (`challenger.id` or `defender.id`), or `null` if the match ends in a draw.

## Usage Example

```javascript
import { createTeam, showdown } from 'sofifa.js';

(async () => {
    // Create two teams
    const nightmareTeam = await createTeam('Nightmare Team');
    const dreamTeam = await createTeam('Dream Team');
    
    // Simulates a showdown between the two teams
    const winnerId = showdown(nightmareTeam, dreamTeam);
    
    // Determine which team won the battle
    const winner = nightmareTeam.id === winnerId ? nightmareTeam : dreamTeam;
    
    if (!winner) console.log('No winners in the match that has just been simulated. The end result was a draw!');
    
    console.log(
        '[Match simulated]',
        `\nChallenger: ${nightmareTeam.name} (${nightmareTeam.id}) [${calculateOverall(Object.values(nightmareTeam.lineup).flat()).toFixed(2)}]`,
        `\nDefender: ${dreamTeam.name} (${dreamTeam.id}) [${calculateOverall(Object.values(dreamTeam.lineup).flat()).toFixed(2)}]\n`,
        `\nSimulated match winner: ${winner.name} (${winner.id})`
    );
})();
```

## Errors

- **`TypeError`**: Thrown if either `challenger` or `defender` does not conform to the `<Object>.Constants.TEAM_SCHEMA` schema.

## Notes

- The function uses `calculateOverall` to compute the average overall ratings of both teams, considering position-based decline rates.
- It calculates the probability of each team winning or drawing based on their overall ratings and the `draw` probability.
- The final result is determined by comparing random values against the calculated probabilities, taking into account the chance of a draw.