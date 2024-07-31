<h1 align="center">retrievePlayers</h1>

Retrieves a list of players based on the provided filters.

## Parameters

- **`filters`** (`Object`, optional): An object containing filters for player search. See the **[all filters list](https://github.com/emptydev1/sofifa.js/blob/main/docs/v2/searchFilters.md)**.

## Parameters Validation

- The `filters` parameter must be an object and only contain keys listed in `<Object>.Constants.ALLOWED_FILTERS`.
- If the `keyword` filter is provided, it must be a string.
- All other filters must be numbers within the allowed range, except `keyword`.

## Returns

- Returns a `Promise` that resolves to an `Array` of objects, each representing a player with the following properties:
  - **`id`** (`string`): Player ID extracted from the endpoint.
  - **`overall`** (`number`): Player's overall rating.
  - **`endpoint`** (`string`): Player's endpoint in the data source.
  - **`name`** (`string`): Player's name.

## Usage Example

```javascript
import { retrievePlayers } from 'sofifa.js';

retrievePlayers({ keyword: 'Messi' })
    .then(console.log)
    .catch(console.error);
```

## Errors

- **`TypeError`**: Thrown if `filters` is not a valid object or if any filter is out of the allowed range or has an incorrect type.

## Notes

- The function makes an HTTP request to **[sofifa.com](https://sofifa.com/players)** with the applied filters and returns a filtered and formatted list of players.
- The response is processed to extract specific player data such as overall rating, endpoint, and name.