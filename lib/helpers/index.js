const path = require('path');

const layers = {
    entities: 'entities',
    features: 'features',
    shared: 'shared',
    pages: 'pages',
    widgets: 'widgets',
};

function isPathRelative(path) {
    return path === '.' || path.startsWith('./') || path.startsWith('../');
}

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

module.exports = {
    getDefaultOptions,
    shouldBeRelative,
    getNormalizedCurrentFilePath,
};
