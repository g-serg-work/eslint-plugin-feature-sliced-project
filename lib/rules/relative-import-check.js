/**
 * @fileoverview relative-import-check
 * @author g-serg
 */
'use strict';

const path = require('path');
const { getDefaultOptions, isPathRelative } = require('../helpers');

const NAME = path.basename(__dirname);
const DESCRIPTION = 'Within one slice, all paths must be relative';

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
    },
};

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'problem', // `layout`, `suggestion`, or `layout`
        docs: {
            description: DESCRIPTION,
            recommended: true,
            url: 'https://github.com/g-serg-work/eslint-plugin-feature-sliced-project/blob/master/docs/rules/relative-import-check.md',
        },
        fixable: 'code', // Or `code` or `whitespace`
        schema: [schema],
        messages: {
            // Add messageId and message
            needRelative: 'Within one slice, all paths must be relative',
        },
    },

    create(context) {
        // variables should be defined here
        const { alias } = getDefaultOptions(schema, context);

        const layers = {
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
        function getNormalizedCurrentFilePath(currentFilePath) {
            const normalizedPath = path.toNamespacedPath(currentFilePath);
            const projectFrom = normalizedPath.split('src')[1];
            return projectFrom.split('\\').join('/');
        }

        function shouldBeRelative(from, to) {
            if (isPathRelative(to)) {
                return false;
            }

            // example entities/Article
            const toArray = to.split('/');
            const toLayer = toArray[0]; // entities
            const toSlice = toArray[1]; // Article

            if (!toLayer || !toSlice || !layers[toLayer]) {
                return false;
            }

            const projectFrom = getNormalizedCurrentFilePath(from);
            const fromArray = projectFrom.split('/');

            const fromLayer = fromArray[1];
            const fromSlice = fromArray[2];

            if (!fromLayer || !fromSlice || !layers[fromLayer]) {
                return false;
            }

            return fromSlice === toSlice && toLayer === fromLayer;
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            // visitor functions for different types of nodes
            ImportDeclaration(node) {
                // example app/entities/Article
                const value = node.source.value;
                const importTo = alias ? value.replace(`${alias}/`, '') : value;

                // example C:\Project\src\entities\Article
                const fromFilename = context.filename;

                if (shouldBeRelative(fromFilename, importTo)) {
                    context.report({
                        node,
                        messageId: 'needRelative',
                        fix: (fixer) => {
                            const normalizedPath = getNormalizedCurrentFilePath(fromFilename) // /entities/Article/Article.tsx
                                .split('/')
                                .slice(0, -1)
                                .join('/');

                            let relativePath = path.relative(normalizedPath, `/${importTo}`).split('\\').join('/');

                            if (!relativePath.startsWith('.')) {
                                relativePath = './' + relativePath;
                            }

                            return fixer.replaceText(node.source, `'${relativePath}'`);
                        },
                    });
                }
            },
        };
    },
};
