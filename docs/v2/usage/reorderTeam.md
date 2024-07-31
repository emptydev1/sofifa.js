<h1 align="center">reorderTeam</h1>

Reorders the players in a team according to a specified formation.

## Parameters

- **`formation`** (`string` | `Object`): Formation pattern specifying the number of players in each position (e.g., '4-4-2') or an object with formation details.
- **`team`** (`Object`): Team object to be reordered. Must conform to `<Object>.Constants.TEAM_SCHEMA`.

## Parameters Validation

- The `team` object must conform to the `<Object>.Constants.TEAM_SCHEMA` schema.
- The `formation` must be parsable into an object with `defenders`, `midfielders`, and `forwards` properties.

## Returns

- Returns an `Object` representing the team with players reordered according to the specified formation. The `lineup` property is updated with new arrays for `defenders`, `midfielders`, and `forwards` based on the formation.

## Usage Example

```javascript
import { reorderTeam, createTeam } from 'sofifa.js';

(async() => {
    const team = await createTeam('Dream Team', '4-4-2');
    
    console.log(reorderTeam('4-3-3', team));
})();
```

## Errors

- **`TypeError`**: Thrown if the `formation` cannot be parsed into an object, or if the `team` does not conform to the `<Object>.Constants.TEAM_SCHEMA`.
- **`RangeError`**: Thrown if the formation has fewer positions than available players.

## Notes

- The function uses `getFormation` to parse the `formation` string into an object with the number of defenders, midfielders, and forwards.
- The total number of positions in the formation must be at least equal to the number of players available.
- Players are redistributed into the new positions according to the specified formation.