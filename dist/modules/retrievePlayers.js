'use strict';

const { fetch } = require('undici');
const { load } = require('cheerio');
const Constants = require('../assets/Constants');

module.exports = async function retrievePlayers(filters = {}) {
    if (typeof filters !== 'object' || !Object.keys(filters).every((key) => Constants.ALLOWED_FILTERS.includes(key))) throw new TypeError(`The "filters" parameter is invalid. Expected an object with the keys ${Constants.ALLOWED_FILTERS.join(', ')}`);
    if (filters.keyword && typeof filters.keyword !== 'string') throw new TypeError(`The "keyword" filter is invalid. Expected a string, received: ${typeof filters.keyword}`);
    if (!Object.entries(filters).every(([key, value]) => key !== 'keyword' ? typeof value === 'number' && value >= Constants.MINIUM_STATISTIC && value <= Constants.MAXIUM_STATISTIC : true)) throw new TypeError('The selected filters are invalid. Except for "keyword", all others must be a number between 0 and 99');
    
    const document = await fetch(`https://sofifa.com/players?${new URLSearchParams({ ...filters, type: 'all' }).toString()}`)
        .then((e) => e.text())
        .catch(() => '');
    const $ = load(document, { lowerCaseTags: true }, true);
    
    return $('main article table tbody > tr')
        .map(
            (_, el) => 
                ({
                    overall: parseInt($(el).find('td.d2.col-sort em').text()),
                    endpoint: $(el).find('td a').first().attr('href'),
                    name: $(el).find('td a').first().text().trim()
                })
        )
        .toArray()
        .filter(
            (player) =>
               typeof player.overall === 'number'
               && /^\/player\/\d+\/[a-zA-Z0-9\-]+\/\d+\/$/.test(player.endpoint))
        .map((player) => ({ id: player.endpoint.split('/').at(2), ...player }));
};