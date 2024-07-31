<h1 align="center">createTeam</h1>

Creates a football team with the specified name and options for player positions.

## Parameters

- **`name`** (`string`): The name of the team.
- **`options`** (`Object | string`, optional): Configuration options for the team formation. Can be either:
  - **`Object`**: 
    - **`midfielders`** (`number`): Number of midfielders in the team.
    - **`defenders`** (`number`): Number of defenders in the team.
    - **`inventory`** (`number`): Number of additional players in the inventory.
    - **`forwards`** (`number`): Number of forwards in the team.
  - **`string`**: Formation string in the format `X-Y-Z`, where:
    - **`X`** (`number`): Number of defenders.
    - **`Y`** (`number`): Number of midfielders.
    - **`Z`** (`number`): Number of forwards.

## Parameters Validation

- The `name` parameter must be a string.
- If `options` is an object, all values must be integers between 1 and 7.
- If `options` is a string, it must match the format `X-Y-Z` where X, Y, and Z are integers between 1 and 7.

## Returns

Returns a `Promise` that resolves to an `Object` representing the created team with the following properties:

  - **`id`** (`string`): Randomly generated ID for the team.
  - **`name`** (`string`): Capitalized name of the team.
  - **`creationDate`** (`number`): Timestamp of when the team was created.
  - **`lineup`** (`Object`): Team lineup including:
    - **`goalkeeper`** (`Object`): Player object for the goalkeeper position.
    - **`defenders`** (`Array<Object>`): Array of player objects for defenders.
    - **`midfielders`** (`Array<Object>`): Array of player objects for midfielders.
    - **`forwards`** (`Array<Object>`): Array of player objects for forwards.
  - **`inventory`** (`Array<Object>`): Array of additional player objects.

## Usage Example

```javascript
import { createTeam } from 'sofifa.js';

// Using an object to specify team formation
createTeam('My Dream Team', { midfielders: 4, defenders: 5 })
    .then(console.log)
    .catch(console.error);

// Using a string to specify team formation
createTeam('My Dream Team', '4-3-3')
    .then(console.log)
    .catch(console.error);
```

## Errors

- **`TypeError`**: Thrown if the `name` parameter is not a string or if the `options` parameter is invalid (either not a string or object, or does not match the required format).

## Notes

- The function imports a list of players from `dist/assets/Players.json`, randomly selects players based on the specified options or formation string, and creates a team object.