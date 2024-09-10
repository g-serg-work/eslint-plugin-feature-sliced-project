/**
 * @fileoverview relative-import-check
 * @author g-serg
 */
'use strict';

const path = require('path');
const { getDefaultOptions, shouldBeRelative, getNormalizedCurrentFilePath } = require('../helpers');

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
            needRelative: 'Within one slice, all paths must be relative',
        }, // Add messageId and message
    },

    create(context) {
        // variables should be defined here
        const { alias } = getDefaultOptions(schema, context);

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
