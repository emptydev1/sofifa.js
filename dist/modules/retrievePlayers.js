'use strict';

const { fetch } = require('undici');
const { load } = require('cheerio');
const Constants = require('../assets/Constants');

module.exports = async function retrievePlayers(filters = {}) {
    if (typeof filters !== 'object' || !Object.keys(filters).every((key) => Constants.ALLOWED_FILTERS.includes(key))) throw new TypeError(`The "filters" parameter is invalid. Expected an object with the keys ${Constants.ALLOWED_FILTERS.join(', ')}`);
    if (filters.keyword && typeof filters.keyword !== 'string') throw new TypeError(`The "keyword" filter is invalid. Expected a string, received: ${typeof filters.keyword}`);
    if (!Object.entries(filters).every(([key, value]) => key !== 'keyword' ? typeof value === 'number' && value > -1 && value < 100 : true)) throw new TypeError('The selected filters are invalid. Except for "keyword", all others must be a number between 0 and 99');
    
    const document = await fetch(`https://sofifa.com/players?${new URLSearchParams({ ...filters, type: 'all' }).toString()}`)
        .then((e) => e.text())
        .catch(() => '');
    const $ = load(document, { lowerCaseTags: true }, true);
    
    return $('a').map((_, el) => $(el).attr('href'))
        .toArray()
        .filter((root) => /^\/player\/\d+\/[a-zA-Z0-9\-]+\/\d+\/$/.test(root));
};