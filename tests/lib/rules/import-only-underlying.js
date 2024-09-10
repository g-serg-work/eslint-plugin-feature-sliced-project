/**
 * @fileoverview import-only-underlying
 * @author g-serg
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/import-only-underlying'),
    RuleTester = require('eslint').RuleTester;

const aliasOptions = [
    {
        alias: '@',
    },
];

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('import-only-underlying', rule, {
    valid: [
        // give me some code that won't trigger a warning
        {
            filename: 'C:\\Project\\src\\features\\Article',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/shared/Button.tsx'",
            errors: [],
            options: aliasOptions,
        },
        {
            filename: 'C:\\Project\\src\\features\\Article',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
            errors: [],
            options: aliasOptions,
        },
        {
            filename: 'C:\\Project\\src\\app\\providers',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Articl'",
            errors: [],
            options: aliasOptions,
        },
        {
            filename: 'C:\\Project\\src\\widgets\\pages',
            code: "import { useLocation } from 'react-router-dom'",
            errors: [],
            options: aliasOptions,
        },
        {
            filename: 'C:\\Project\\src\\app\\providers',
            code: "import { addCommentFormActions, addCommentFormReducer } from 'redux'",
            errors: [],
            options: aliasOptions,
        },
        {
            filename: 'C:\\Project\\src\\index.tsx',
            code: "import { StoreProvider } from '@/app/providers/StoreProvider';",
            errors: [],
            options: aliasOptions,
        },
        {
            filename: 'C:\\Project\\src\\entities\\Article.tsx',
            code: "import { StateSchema } from '@/app/providers/StoreProvider'",
            errors: [],
            options: [
                {
                    alias: '@',
                    ignoreImportPatterns: ['**/StoreProvider'],
                },
            ],
        },
    ],

    invalid: [
        {
            filename: 'C:\\Project\\src\\entities\\providers',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/features/Articl'",
            errors: [{ messageId: 'onlyUnderlying', type: 'ImportDeclaration' }],
            options: aliasOptions,
        },
        {
            filename: 'C:\\Project\\src\\features\\providers',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Articl'",
            errors: [{ messageId: 'onlyUnderlying', type: 'ImportDeclaration' }],
            options: aliasOptions,
        },
        {
            filename: 'C:\\Project\\src\\entities\\providers',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Articl'",
            errors: [{ messageId: 'onlyUnderlying', type: 'ImportDeclaration' }],
            options: aliasOptions,
        },
    ],
});
