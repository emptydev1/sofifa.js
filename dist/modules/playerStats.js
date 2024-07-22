'use strict';

const { fetch } = require('undici');
const { load } = require('cheerio');
const retrievePlayers = require('./retrievePlayers');

module.exports = async function playerStats(filters, id) {
    const endpoint = filters ? (await retrievePlayers(filters)).at(0)?.endpoint : `/player/${id}`;
    
    if (!endpoint || !/^\/player\/\d+(\/[A-Za-z-]+\/\d+(\/)?)?$/.test(endpoint)) return {};
    
    const document = await fetch(`https://sofifa.com${endpoint}`).then((e) => e.text()).catch(() => '');
    
    if (!document) return {};
    
    const $ = load(document, { lowerCaseTags: true }, true);
    const data = {
        id: $('p label:contains(\"ID\")').parent().text().split(/\s+/)[1],
        fullName: $('div.profile.clearfix h1').first().text(),
        ...JSON.parse($('script:contains("givenName")').first().text().trim()),
        positions: $('div.profile.clearfix p > span.pos').map((_, el) => $(el).text()).toArray(),
        rating: {},
        overall: parseInt($('div.grid .col div.sub:contains("Overall")').parent().children('em').text())
    };
    const rating = $('script:contains("POINT_PAC")').text().slice(3).trim().split(',');
    const labels = rating
        .filter((rate) => rate.startsWith('LABEL'))
        .map((rate) => rate.split('='))
        .reduce((ob, rate) => (ob[rate[0].split('_')[1]] = rate[1].replace(/['"]/g, '').toLowerCase(), ob), {});
    
    rating
        .filter((rate) => rate.startsWith('POINT'))
        .map((rate) => rate.split('='))
        .forEach((rate) => data.rating[labels[rate[0].split('_')[1]]] = parseInt(rate[1]));
    
    return data;
};