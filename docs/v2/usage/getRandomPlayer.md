<h1 align="center">getRandomPlayer</h1>

Retrieves a random player with an overall rating within the specified range, with probabilistic weighting.

## Parameters

- **`min`** (`number`): Minimum overall rating of the player.
- **`max`** (`number`): Maximum overall rating of the player.
- **`prob`** (`number`, optional): Probability factor to weight the chances of selecting players with higher ratings. Defaults to `1.3`.

## Parameters Validation

- Both `min` and `max` must be numbers within the range defined by `<Object>.Constants.MINIMUM_STATISTIC` and `<Object>.Constants.MAXIMUM_STATISTIC`.
- The `prob` parameter must be a number.

## Returns

Returns a `Promise` that resolves to an `Object` representing the random player with the following properties:
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
import { getRandomPlayer } from 'sofifa.js';

getRandomPlayer(70, 85)
    .then(console.log)
    .catch(console.error);
```

## Errors

- **`TypeError`**: Thrown if `min` or `max` are not numbers within the valid range, or if `prob` is not a number.

## Notes

- The function calculates probabilistic weights to influence the selection of players based on their overall rating.
- It uses the `retrievePlayers` function to get a list of players within the specified range and selects one randomly.
- If a player is found, it fetches detailed statistics using `playerStats`.