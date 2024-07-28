'use strict';

export default function getFormation(formation) {
    return typeof formation === 'string' && /^(\d)-(\d)-(\d)$/.test(formation)
        ? formation.split('-')
            .reduce((data, item, index) =>
                (data[index == 0 ? 'defenders' : index == 1 ? 'midfielders' : 'forwards'] = parseInt(item), data),
                {}
            )
        : typeof formation === 'object'
            ? formation
            : void 0;
}