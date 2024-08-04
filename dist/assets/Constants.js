const Joi = require('joi');
const Constants = {
    PLAYER_POSITIONS: {
        Forward: {
            acronyms: [
                'LS', 'ST', 'RS',
                'LW', 'LF', 'CF',
                'RF', 'RW'
            ],
            _id: 0
        },
        Midfielder: {
            acronyms: [
                'LAM', 'CAM', 'RAM',
                'CDM', 'CM', 'RM',
                'LM', 'LDM', 'RDM',
                'LCM', 'RCM'
            ],
            _id: 1
        },
        Defense: {
            acronyms: [
                'CB', 'RB', 'LB',
                'LWB', 'RWB', 'LCB',
                'RCB'
            ],
            _id: 2
        },
        Goalkeeper: {
            acronyms: [ 'GK' ],
            _id: 3
        }
    },
    
    ALLOWED_FILTERS: [ 
        'keyword', 'pacl', 'pach', 'shol',
        'shoh', 'pasl', 'pash', 'dril',
        'drih', 'defl', 'defh', 'phyl', 
        'phyh', 'oal', 'oah'
    ],
    MINIUM_STATISTIC: 0,
    MAXIUM_STATISTIC: 99, 
    MINIUM_OVERALL_RATING: 47,
    MAXIUM_OVERALL_RATING: 91,
};

Constants.PLAYER_SCHEMA = Joi.object({
    _id: Joi.number().required(),
    id: Joi.string().required(),
    fullName: Joi.string().required(),
    '@context': Joi.string().required(),
    '@type': Joi.string().required(),
    givenName: Joi.string().required(),
    familyName: Joi.string().required(),
    description: Joi.string().required(),
    gender: Joi.string().required(),
    birthDate: Joi.string().required(),
    affiliation: Joi.string().required(),
    height: Joi.string().required(),
    weight: Joi.string().required(),
    jobTitle: Joi.string().required(),
    nationality: Joi.string().required(),
    netWorth: Joi.string().required(),
    image: Joi.string().required(),
    positions: Joi.array().items(Joi.string()).required(),
    rating: Joi.object({
        pac: Joi.number().required(),
        sho: Joi.number().required(),
        pas: Joi.number().required(),
        dri: Joi.number().required(),
        def: Joi.number().required(),
        phy: Joi.number().required()
    }).required(),
    overall: Joi.number().required(),
    position: Joi.valid(
        ...Object.values(Constants.PLAYER_POSITIONS).map((position) => position.acronyms).flat(),
        null
    ).required(),
    endpoint: Joi.string().required()
});
Constants.TEAM_SCHEMA = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    creationDate: Joi.number().required(),
    lineup: Joi.object({
        goalkeeper: Constants.PLAYER_SCHEMA.required(),
        forwards: Joi.array().items(Constants.PLAYER_SCHEMA).required(),
        defenders: Joi.array().items(Constants.PLAYER_SCHEMA).required(),
        midfielders: Joi.array().items(Constants.PLAYER_SCHEMA).required()
    }).required(),
    inventory: Joi.array().items(Constants.PLAYER_SCHEMA).required()
});

module.exports = Constants;