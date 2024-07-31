<h1 align="center">sofifa.js</h1>

<p align="center">
  <img src="https://img.shields.io/npm/v/sofifa.js.svg" alt="npm version">
  <img src="https://img.shields.io/npm/dt/sofifa.js.svg" alt="npm downloads">
  <img src="https://img.shields.io/github/license/emptydev1/sofifa.js.svg" alt="license">
</p>

A simple and easy-to-use package to obtain player information from data from the **[sofifa.com](https://sofifa.com/)** website in addition to generating teams randomly. This library was created to meet the needs of a brazillian [WhatsApp bot](https://chat.whatsapp.com/GMGb5faPJjf7xfCMvQysaW), however it is also available for public use.

<h1>Table of Contents</h1>

- [Installation](#installation)
- [Usage Examples](#usage-examples)
  - [Retrieve Players](#retrieve-players)
  - [Get a Random Player](#get-a-random-player)
  - [Player Stats](#player-stats)
- [Documentation](#documentation)
- [Filters](#filters)
- [License](#license)

<h1>Installation</h1>

To install this dependency to your project you must have **[Node.js](https://github.com/nodejs/node)** installed on your machine.

If you already have **Node.js** installed on your machine, just run the following command in your terminal:

```bash
$ npm install sofifa.js@latest --save
```

**Note:** It is highly recommended that when installing this dependency you install the latest released version.

<h2>Usage Examples</h2>

### Retrieve Players

Retrieve a list of players based on specific **[filters](https://github.com/emptydev1/sofifa.js/blob/main/docs/v2/usage/searchFilters.md)**.

```javascript
import { retrievePlayers } from 'sofifa.js';

// Example: Retrieve players with specified filters (minium defense up to 50 and maxium defense up to 70)
retrievePlayers({ defl: 50, defh: 70 })
    .then(console.log)
    .catch(console.error);
```

### Player Stats

Fetch detailed statistics of a player based on specific **[filters](https://github.com/emptydev1/sofifa.js/blob/main/docs/v2/usage/searchFilters.md)** or a identificator (ID).

```javascript
import { playerStats } from 'sofifa.js';

// Example: Fetch player stats with specified filters
playerStats({ keyword: 'Bellingham' }) 
    .then(console.log)
    .catch(console.error);
```

### Get a random player

Search for a random player based on a minimum and maximum overall and define the inverse probability of the player with the highest overall coming.

```javascript
import { getRandomPlayer } from 'sofifa.js';

// Example of how to get a random player with maxium and minium overall ratings
getRandomPlayer(47, 60)
    .then((player) => console.log(`[${player.id}] ${player.fullName}`))
    .catch(console.error);
```

<h1 align="center">Documentation</h1>

<p>To see all the documentation for this project and see basic examples of how to use it, just access the repository of <o><a href="https://github.com/emptydev1/sofifa.js/blob/main/docs">GitHub</a></o>.</p>

<h1 align="center">Contribution guidelines</h1>

<p>Contributions are always welcome! If you find a bug or would like to suggest a new feature, open an issue at <o><a href="https://github.com/emptydev1/sofifa.js/issues">GitHub</a></o>. If you would like to contribute to this project, fork the repository and submit a pull request.</p>

<h1 align="center">License</h1>

<p>Sofifa.js is licensed under the <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache License, version 2.0</a>. See <a href="https://github.com/emptydev1/sofifa.js/blob/main/LICENSE">LICENSE</a> for full license text.</p>