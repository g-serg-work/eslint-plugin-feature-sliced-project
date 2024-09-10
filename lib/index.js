/**
 * @fileoverview fsd rules check
 * @author g-serg
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require('requireindex');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + '/rules');

// import processors
module.exports.processors = {
    // add your processors here
};

module.exports.configs = {
    recommended: {
        plugins: ['feature-sliced-project'],
        rules: {
            'relative-import-check': 'error',
            'import-only-underlying': 'error',
        },
    },
};
