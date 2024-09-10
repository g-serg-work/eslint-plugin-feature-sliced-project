/**
 * @fileoverview relative-import-check
 * @author g-serg
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/relative-import-check'),
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
ruleTester.run('relative-import-check', rule, {
    valid: [
        // give me some code that won't trigger a warning
        {
            filename: 'C:\\Project\\src\\entities\\Article',
            code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'",
            errors: [],
        },
    ],

    invalid: [
        {
            filename: 'C:\\Project\\src\\entities\\Article',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/model/slices/addCommentFormSlice'",
            output: "import { addCommentFormActions, addCommentFormReducer } from './Article/model/slices/addCommentFormSlice'",
            errors: [{ messageId: 'needRelative', type: 'ImportDeclaration' }],
            options: aliasOptions,
        },
        {
            filename: 'C:\\Project\\src\\entities\\Article',
            code: "import { addCommentFormActions, addCommentFormReducer } from 'entities/Article/model/slices/addCommentFormSlice'",
            output: "import { addCommentFormActions, addCommentFormReducer } from './Article/model/slices/addCommentFormSlice'",
            errors: [{ messageId: 'needRelative', type: 'ImportDeclaration' }],
        },
    ],
});
