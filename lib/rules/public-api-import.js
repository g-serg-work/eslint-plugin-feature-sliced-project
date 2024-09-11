/**
 * @fileoverview public-api-import
 * @author g-serg
 */
'use strict';

const path = require('path');
const { getDefaultOptions, isPathRelative, normalizePath } = require('../helpers');
const micromatch = require('micromatch');

const NAME = path.basename(__dirname);
const DESCRIPTION = 'Public api import rules';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleMetaData['schema']}
 */
const schema = {
    title: NAME,
    description: DESCRIPTION,
    type: 'object',
    properties: {
        alias: {
            type: 'string',
            description: 'using symbol for alias',
            default: '',
        },
        testFilesPatterns: {
            type: 'array',
            description: 'test files patterns',
            default: [],
        },
    },
};

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'problem', // `layout`, `suggestion`, or `layout`
        docs: {
            description: DESCRIPTION,
            recommended: true,
            url: 'https://github.com/g-serg-work/eslint-plugin-feature-sliced-project/blob/master/docs/rules/public-api-import.md',
        },
        fixable: 'code', // Or `code` or `whitespace`
        schema: [schema],
        messages: {
            // Add messageId and message
            publicError: 'Absolute import is only allowed from the Public API (index.ts)',
            testingPublicError: 'Test data needs to be imported from publicApi/testing.ts',
        },
    },

    create(context) {
        // variables should be defined here
        const { alias, testFilesPatterns } = getDefaultOptions(schema, context);

        const checkingLayers = {
            entities: 'entities',
            features: 'features',
            pages: 'pages',
            widgets: 'widgets',
        };

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            // visitor functions for different types of nodes
            ImportDeclaration(node) {
                const value = node.source.value;
                const importTo = alias ? value.replace(`${alias}/`, '') : value;

                if (isPathRelative(importTo)) {
                    return;
                }

                // [entities, article, model, types]
                const segments = importTo.split('/');
                const layer = segments[0];
                const slice = segments[1];

                if (!checkingLayers[layer]) {
                    return;
                }

                const isImportNotFromPublicApi = segments.length > 2;
                // [entities, article, testing]
                const isTestingPublicApi = segments[2] === 'testing' && segments.length < 4;

                if (isImportNotFromPublicApi && !isTestingPublicApi) {
                    context.report({
                        node,
                        messageId: 'publicError',
                        fix: (fixer) => {
                            return fixer.replaceText(node.source, `'${alias}/${layer}/${slice}'`);
                        },
                    });
                }

                if (isTestingPublicApi) {
                    const currentFilePath = context.filename;
                    const normalizedPath = normalizePath(currentFilePath);

                    const isCurrentFileTesting = testFilesPatterns.some((pattern) => {
                        return micromatch.isMatch(normalizedPath, pattern);
                    });

                    if (!isCurrentFileTesting) {
                        context.report({
                            node,
                            messageId: 'testingPublicError',
                        });
                    }
                }
            },
        };
    },
};
