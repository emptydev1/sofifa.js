<h1 align="center">sofifa.js</h1>

<p align="center">
  <img src="https://img.shields.io/npm/v/sofifa.js.svg" alt="npm version">
  <img src="https://img.shields.io/npm/dt/sofifa.js.svg" alt="npm downloads">
  <img src="https://img.shields.io/github/license/emptydev1/sofifa.js.svg" alt="license">
</p>

A simple and easy-to-use package to obtain player information from data from the **[sofifa.com](https://sofifa.com/)** website in addition to generating teams randomly. This library was created to meet the needs of a brazillian [WhatsApp bot](https://chat.whatsapp.com/GMGb5faPJjf7xfCMvQysaW), however it is also available for public use.

<h1>Table of Contents</h1>

- [Installation](#installation)
- [Usage](#usage)
  - [Retrieve Players](#retrieve-players)
  - [Get a Random Player](#get-a-random-player)
  - [Player Stats](#player-stats)
  - [Create Team](#create-team)
- [Filters](#filters)
- [License](#license)

<h1>Installation</h1>

To install this dependency to your project you must have **[Node.js](https://github.com/nodejs/node)** installed on your machine.

If you already have **Node.js** installed on your machine, just run the following command in your terminal:

```bash
$ npm install sofifa.js@latest --save
```

**Note:** It is highly recommended that when installing this dependency you install the latest released version.

<h2>Usage</h2>

<h3>Retrieve Players</h3>

Retrieve a list of players based on specific filters.

```javascript
import { retrievePlayers } from 'sofifa.js';

// Example: Retrieve players with specified filters (minium defense up to 50 and maxium defense up to 70)
retrievePlayers({ defl: 50, defh: 70 }) // Sintaxe: <Object>.retrievePlayers(?filters: <Object | null> = {})
    .then(console.log)
    .catch(console.error);
```

### Get a random player

Search for a random player based on a minimum and maximum overall and define the inverse probability of the player with the highest overall coming.

```javascript
import { getRandomPlayer } from 'sofifa.js';

// Example of how to get a random player with maxium and minium overall ratings
getRandomPlayer(47, 60) // Sintaxe: <Object>.getRandomPlayer(min: Number, max: Number, ?invProb: Number = 1.3)
    .then((player) => console.log(`[${player.id}] ${player.fullName}`))
    .catch(console.error);
```

<h3>Player Stats</h3>

Fetch detailed statistics of a player based on specific filters or a identificator (ID).

```javascript
import { playerStats } from 'sofifa.js';

// Example: Fetch player stats with specified filters
playerStats({ keyword: 'Bellingham' }) // Sintaxe: <Object>.playerStats(?filters: <Object | null> = {}, ?id: <String | null> = null) 
    .then(console.log)
    .catch(console.error);
```

### Create Team

Creates a random team with the specified name and the number of players. 

```javascript
import { createTeam } from 'sofifa.js';

// Example of team creation
createTeam('Dream Team') // Sintaxe: <Object>.createTeam(name: String = null, ?options: Object = { midfielders: 4, defenders: 3, forwards: 3, inventory: 3 })
    .then((team) =>
        Object.values(team.lineup)
        .flat()
        .forEach((player) =>
            console.log(`[${player.id}] ${player.fullName} (${player.jobTitle}) | ${player.overall}ov`)))
    .catch(console.error);
```

<h2>Filters</h2>

You can use the following filters to refine your search:

### General Filters

- **keyword**: General search keyword (e.g., player name)
- **oal**: Minium overall rating (e.g. `50` for players with overall above 50)
- **oah**: Maxium overall rating (e.g. `50` for players with overall below 50)

**Note:** Currently, the minimum and maximum overall values for players in **[sofifa.com](https://sofifa.com/)** are 47 and 91, respectively. Therefore, if you enter values outside this range, the function will likely return an empty object.

### Outfield Player Filters

- **pacl**: Minimum Pace rating (e.g., `70` for players with pace above 70)
- **pach**: Maximum Pace rating (e.g., `90` for players with pace below 90)
- **shol**: Minimum Shooting rating (e.g., `70` for players with shooting above 70)
- **shoh**: Maximum Shooting rating (e.g., `90` for players with shooting below 90)
- **pasl**: Minimum Passing rating (e.g., `70` for players with passing above 70)
- **pash**: Maximum Passing rating (e.g., `90` for players with passing below 90)
- **dril**: Minimum Dribbling rating (e.g., `70` for players with dribbling above 70)
- **drih**: Maximum Dribbling rating (e.g., `90` for players with dribbling below 90)
- **defl**: Minimum Defense rating (e.g., `70` for players with defense above 70)
- **defh**: Maximum Defense rating (e.g., `90` for players with defense below 90)
- **phyl**: Minimum Physical rating (e.g., `70` for players with physical above 70)
- **phyh**: Maximum Physical rating (e.g., `90` for players with physical below 90)

### Goalkeeper Filters

The following filters are equivalent to the outfield player filters but for goalkeepers:

- **divl**: Minimum Diving rating (equivalent to pacl)
- **divh**: Maximum Diving rating (equivalent to pach)
- **hanl**: Minimum Handling rating (equivalent to shol)
- **hanh**: Maximum Handling rating (equivalent to shoh)
- **kicl**: Minimum Kicking rating (equivalent to pasl)
- **kich**: Maximum Kicking rating (equivalent to pash)
- **refl**: Minimum Reflexes rating (equivalent to dril)
- **refh**: Maximum Reflexes rating (equivalent to drih)
- **spdl**: Minimum Speed rating (equivalent to defl)
- **spdh**: Maximum Speed rating (equivalent to defh)
- **posl**: Minimum Positioning rating (equivalent to phyl)
- **posh**: Maximum Positioning rating (equivalent to phyh)

---

This comprehensive list of filters allows you to fine-tune your search to find exactly the players or goalkeepers you need based on various attributes and criteria.

<h1 align="center">Contribution guidelines</h1>

<p>Contributions are always welcome! If you find a bug or would like to suggest a new feature, open an issue at <o><a href="https://github.com/emptydev1/sofifa.js/issues">GitHub</a></o>. If you would like to contribute to this project, fork the repository and submit a pull request.</p>

<h1 align="center">License</h1>

<p>Sofifa.js is licensed under the <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache License, version 2.0</a>. See <a href="https://github.com/emptydev1/sofifa.js/blob/main/LICENSE">LICENSE</a> for full license text.</p>