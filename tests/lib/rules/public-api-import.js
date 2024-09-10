/**
 * @fileoverview public-api-import
 * @author g-serg
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/public-api-import'),
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
ruleTester.run('public-api-import', rule, {
    valid: [
        // give me some code that won't trigger a warning
        {
            code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'",
            errors: [],
        },
        {
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
            errors: [],
            options: aliasOptions,
        },
        {
            filename: 'C:\\Project\\src\\entities\\file.test.ts',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
            errors: [],
            options: [
                {
                    alias: '@',
                    testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx'],
                },
            ],
        },
        {
            filename: 'C:\\Project\\src\\entities\\StoreDecorator.tsx',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
            errors: [],
            options: [
                {
                    alias: '@',
                    testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx'],
                },
            ],
        },
    ],

    invalid: [
        {
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/model/file.ts'",
            output: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
            errors: [{ messageId: 'publicError' }],
            options: aliasOptions,
        },
        {
            filename: 'C:\\Project\\src\\entities\\StoreDecorator.tsx',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing/file.tsx'",
            output: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
            errors: [{ messageId: 'publicError' }],
            options: [
                {
                    alias: '@',
                    testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx'],
                },
            ],
        },
        {
            filename: 'C:\\Project\\src\\entities\\forbidden.ts',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
            errors: [{ messageId: 'testingPublicError' }],
            options: [
                {
                    alias: '@',
                    testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx'],
                },
            ],
        },
    ],
});
