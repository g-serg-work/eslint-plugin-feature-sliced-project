const { toNamespacedPath } = require('path');

/**
 * @param {import('eslint').Rule.RuleMetaData['schema']} schema
 * @param {import('eslint').Rule.RuleContext} context
 * @returns {Record<string, any>}
 */
const getDefaultOptions = (schema, context) => {
    return Object.entries(schema.properties).reduce((acc, [key, value]) => {
        if (!(value.default in value)) return acc;

        return {
            ...acc,
            [key]: value.default,
        };
    }, context.options[0] || {});
};

const isPathRelative = (path) => {
    return path === '.' || path.startsWith('./') || path.startsWith('../');
};

const normalizePath = (path) => {
    return toNamespacedPath(path)?.replace(/\\/g, '/');
};

module.exports = {
    getDefaultOptions,
    isPathRelative,
    normalizePath,
};
