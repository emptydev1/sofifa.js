'use strict';

const { fetch } = require('undici');
const { load } = require('cheerio');
const retrievePlayers = require('./retrievePlayers');

module.exports = async function playerStats(filters, root) {
    const endpoint = filters ? (await retrievePlayers(filters)).at(0) : (root?.startsWith('/') ? root : '/' + root);
    
    if (!endpoint || !/^\/player\/\d+\/[a-zA-Z0-9\-]+\/\d+\/$/.test(endpoint)) return {};
    
    const document = await fetch(`https://sofifa.com${endpoint}`).then((e) => e.text()).catch(() => '');
    
    if (!document) return {};
    
    const $ = load(document, { lowerCaseTags: true }, true);
    const [ _, age, birthDate, height, weight ] = $('div.profile.clearfix p').first().clone().find('span').remove().end().text().trim().match(/(\d{2})y\.o\. \(([^)]+)\) (\d+)cm \/ [^ ]+ (\d+)kg/) || [];
    const data = {
        id: $('p label:contains(\"ID\")').parent().text().split(/\s+/)[1],
        fullName: $("div.profile.clearfix h1").first().text(),
        selfImage: $('div.profile.clearfix img').first().attr('data-src'),
        positions: $('div.profile.clearfix p > span.pos').map((_, el) => $(el).text()).toArray(),
        birthDate,
        age: age ? parseInt(age) : null,
        weight: weight ? parseInt(weight) : null,
        height: height ? parseInt(height) : null,
        rating: {},
        overall: null
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
    
    const ratings = Object.values(data.rating);
    
    if (ratings.length > 0) data.overall = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    
    return data;
};