<h1 align="center">calculateOverall</h1>

Calculates the average overall rating of a list of players, taking into account position-based decline rates.

## Parameters

- **`players`** (`Array<Object>`): Array of player objects. Each player object must conform to the `<Object>.Constants.PLAYER_SCHEMA` schema.
- **`declineRate`** (`number`, optional): Rate at which the overall rating decreases based on the player's position if it is not correct. Must be between 0 and 1. Default is `0.10`.  

## Parameters Validation

- Each player in the `players` array must match the `<Object>.Constants.PLAYER_SCHEMA` schema.
- The `declineRate` must be a number between 0 and 1. If invalid, defaults to `0.10`.

## Returns

Returns a `number` representing the average overall rating of the players after applying the position-based decline rate.

## Usage Example

```javascript
import { calculateOverall, createTeam } from 'sofifa.js';

// Example: create a team and get the average overall rating
(async() => {
    const team = await createTeam('Dream Team');
    const players = Object.values(team.lineup).flat(); // Flatten the team lineup to get a list of all players
    
    console.log(`Average overall rating of ${team.name} team:`, calculateOverall(players));
})();
```

## Errors

- **`TypeError`**: Thrown if any player data does not conform to the `<Object>.Constants.PLAYER_SCHEMA`.

## Notes

- The function adjusts the overall rating based on the player's position and a specified decline rate.
- Players who play in their primary position or in positions related to their primary position experience less decline in their overall rating.
- The overall rating is adjusted by reducing it based on the `declineRate`, and an average rating is computed for the list of players.