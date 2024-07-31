<h1 align="center">playerStats</h1>

Retrieves detailed statistics for a player based on the provided filters or player ID.

## Parameters

- **`filters`** (`Object`, optional): An object containing filters for searching players. See the **[all filters list](https://github.com/emptydev1/sofifa.js/blob/main/docs/v2/searchFilters.md)**.
- **`id`** (`String`, optional): The player's ID to retrieve stats if no filters are provided.

## Parameters Validation

- The `filters` parameter must be an object and only contain keys listed in `<Object>.Constants.ALLOWED_FILTERS` if provided.
- The `id` parameter must be a valid string if used.
- The `endpoint` derived from the `filters` or `id` must match the expected format for player endpoints.

## Returns

Returns a `Promise` that resolves to an `Object` representing the player with the following properties:

  - **`_id`** (`number`): Player's numeric ID.
  - **`id`** (`string`): Randomly generated string ID.
  - **`fullName`** (`string`): Full name of the player.
  - **`@context`** (`string`): JSON-LD context of the player profile.
  - **`@type`** (`string`): Type of the player profile in JSON-LD.
  - **`givenName`** (`string`): Player's given name.
  - **`familyName`** (`string`): Player's family name.
  - **`description`** (`string`): Description of the player.
  - **`gender`** (`string`): Gender of the player.
  - **`birthDate`** (`string`): Birth date of the player.
  - **`affiliation`** (`string`): Affiliation (team or club) of the player.
  - **`height`** (`string`): Height of the player.
  - **`weight`** (`string`): Weight of the player.
  - **`jobTitle`** (`string`): Job title or role of the player.
  - **`nationality`** (`string`): Nationality of the player.
  - **`netWorth`** (`string`): Net worth of the player.
  - **`positions`** (`Array<string>`): List of positions the player can play.
  - **`rating`** (`Object`): Player's ratings broken down into different attributes.
  - **`overall`** (`number`): Player's overall rating.
  - **`position`** (`string|null`): The main position of the player (modifiable).
  - **`endpoint`** (`string`): Endpoint URL of the player.
  - **`image`** (`string`): URL of the player's image.

## Usage Example

```javascript
import { playerStats } from 'sofifa.js';

// Example: using filters
playerStats({ keyword: 'Messi' })
    .then(console.log)
    .catch(console.error);

// Example: using player id
playerStats(null, '123456')
    .then(console.log)
    .catch(console.error);
```

## Notes

- The function makes an HTTP request to **[sofifa.com](https://sofifa.com)** with the player endpoint to retrieve detailed player stats.
- The response is processed to extract player data including statistics, positions, and image URL.