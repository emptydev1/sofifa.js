<h1 align="center">getFormation</h1>

Parses a formation string or object and returns an object representing the number of players in each position.

## Parameters

- **`formation`** (`string` | `Object`): Formation pattern as a string (e.g., '4-4-2') or an object specifying the number of players in each position.

## Returns
Returns an `Object` with the number of players in each position:
  - **`defenders`** (`number`): Number of defenders.
  - **`midfielders`** (`number`): Number of midfielders.
  - **`forwards`** (`number`): Number of forwards.

If the `formation` is a valid object, it is returned as-is. If the `formation` string does not match the expected pattern, or if the input is neither a valid string nor an object, the function returns `undefined`.

## Usage Example

```javascript
import { getFormation } from 'sofifa.js';

// Example with a formation string
console.log(getFormation('4-4-2')); // Output: { defenders: 4, midfielders: 4, forwards: 2 }

// Example with an existing formation object
console.log(getFormation({ defenders: 3, midfielders: 5, forwards: 2 })); // Output: { defenders: 3, midfielders: 5, forwards: 2 }
```

## Errors

- **`undefined`**: Returned if the `formation` parameter is neither a valid string nor a valid object, or if the formation string does not match the expected pattern.

## Notes

- The function accepts a formation string of the format 'X-Y-Z', where X, Y, and Z represent the number of defenders, midfielders, and forwards respectively.
- If provided an object, it is returned directly without modification.