/**
 * @fileoverview import-only-underlying
 * @author g-serg
 */
'use strict';

const path = require('path');
const { getDefaultOptions, isPathRelative } = require('../helpers');
const micromatch = require('micromatch');

const NAME = path.basename(__dirname);
const DESCRIPTION = 'A layer can only import underlying layers';

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
        ignoreImportPatterns: {
            type: 'array',
            description: 'ignore import patterns',
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
            url: 'https://github.com/g-serg-work/eslint-plugin-feature-sliced-project/blob/master/docs/rules/import-only-underlying.md',
        },
        fixable: 'code', // Or `code` or `whitespace`
        schema: [schema],
        messages: {
            // Add messageId and message
            onlyUnderlying:
                'A layer can only import underlying layers (shared, entities, features, widgets, pages, app)',
        },
    },

    create(context) {
        // variables should be defined here
        const { alias, ignoreImportPatterns } = getDefaultOptions(schema, context);

        const layers = {
            app: ['pages', 'widgets', 'features', 'shared', 'entities'],
            pages: ['widgets', 'features', 'shared', 'entities'],
            widgets: ['features', 'shared', 'entities'],
            features: ['shared', 'entities'],
            entities: ['shared', 'entities'],
            shared: ['shared'],
        };

        const availableLayers = {
            app: 'app',
            entities: 'entities',
            features: 'features',
            shared: 'shared',
            pages: 'pages',
            widgets: 'widgets',
        };

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section
        const getCurrentFileLayer = () => {
            const currentFilePath = context.filename;

            const normalizedPath = path.toNamespacedPath(currentFilePath);
            const projectPath = normalizedPath?.split('src')[1];
            const segments = projectPath?.split('\\');

            return segments?.[1];
        };

        const getImportLayer = (value) => {
            const importPath = alias ? value.replace(`${alias}/`, '') : value;
            const segments = importPath?.split('/');

            return segments?.[0];
        };

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            // visitor functions for different types of nodes
            ImportDeclaration(node) {
                const importPath = node.source.value;
                const currentFileLayer = getCurrentFileLayer();
                const importLayer = getImportLayer(importPath);

                if (isPathRelative(importPath)) {
                    return;
                }

                if (!availableLayers[importLayer] || !availableLayers[currentFileLayer]) {
                    return;
                }

                const isIgnored = ignoreImportPatterns.some((pattern) => {
                    return micromatch.isMatch(importPath, pattern);
                });

                if (isIgnored) {
                    return;
                }

                if (!layers[currentFileLayer]?.includes(importLayer)) {
                    context.report({
                        node,
                        messageId: 'onlyUnderlying',
                    });
                }
            },
        };
    },
};
