'use strict';

const { fetch } = require('undici');
const { load } = require('cheerio');
const retrievePlayers = require('./retrievePlayers');

module.exports = async function playerStats(filters, id) {
    const endpoint = filters ? (await retrievePlayers(filters)).at(0)?.endpoint : `/player/${id}`;
    
    if (!endpoint || !/^\/player\/\d+(\/[A-Za-z-]+\/\d+(\/)?)?$/.test(endpoint)) return {};
    
    const origin = `https://sofifa.com${endpoint}`;
    const document = await fetch(origin)
        .then((e) => e.text())
        .catch(() => '');
    
    if (!document) return {};
    
    const $ = load(document, { lowerCaseTags: true }, true);
    const player = {
        _id: parseInt(new URL(origin).pathname.split('/').at(2)),
        id: Math.random().toString(32).slice(2).substring(0, 6),
        fullName: $('div.profile.clearfix h1').first().text(),
        ...JSON.parse($('script:contains("givenName")').first().text().trim() || '{}'),
        positions: $('div.profile.clearfix p > span.pos').map((_, el) => $(el).text()).toArray(),
        rating: $('script:contains("POINT_PAC")').text().slice(3).trim().split(',')
            .filter((rate) => rate.startsWith('POINT'))
            .map((rate) => rate.split('='))
            .reduce((self, rate) =>
                (self[rate[0].split('_')[1].toLowerCase()] = parseInt(rate[1]), self),
                {}
            ),
        overall: parseInt($('div.grid .col div.sub:contains("Overall")').parent().children('em').text()),
        position: null,
        endpoint
    };
    
    player.image = $(`img[id="${player._id}"]`).attr('data-src')
        || $('img[data-type="player"]').attr('data-src')
        || 'https://cdn.sofifa.net/player_0.svg';
    
    return player;
};