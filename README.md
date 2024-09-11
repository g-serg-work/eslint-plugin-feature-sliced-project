# eslint-plugin-feature-sliced-project

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][build-image]][build-url]

Checking the application for compliance with the rules of Feature-Sliced ​​Design (FSD) architecture

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-feature-sliced-project`:

```sh
npm install eslint-plugin-feature-sliced-project --save-dev
```

## Usage

Add `feature-sliced-project` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": ["feature-sliced-project"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "feature-sliced-project/relative-import-check": "error",
        "feature-sliced-project/import-only-underlying": "error",
        "feature-sliced-project/public-api-import": "error"
    }
}
```

## Configurations

<!-- begin auto-generated configs list -->

|    | Name          |
| :- | :------------ |
| ✅  | `recommended` |

<!-- end auto-generated configs list -->

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                           | Description                                  | 🔧 |
| :------------------------------------------------------------- | :------------------------------------------- | :- |
| [import-only-underlying](docs/rules/import-only-underlying.md) | A layer can only import underlying layers    | 🔧 |
| [public-api-import](docs/rules/public-api-import.md)           | Public api import rules                      | 🔧 |
| [relative-import-check](docs/rules/relative-import-check.md)   | Within one slice, all paths must be relative | 🔧 |

<!-- end auto-generated rules list -->

[npm-image]: https://img.shields.io/npm/v/eslint-plugin-feature-sliced-project?color=0b7285&logoColor=0b7285
[npm-url]: https://www.npmjs.com/package/eslint-plugin-feature-sliced-project
[downloads-image]: https://img.shields.io/npm/dm/eslint-plugin-feature-sliced-project?color=364fc7&logoColor=364fc7
[build-image]: https://github.com/g-serg-work/eslint-plugin-feature-sliced-project/actions/workflows/node.js.yml/badge.svg
[build-url]: https://github.com/g-serg-work/eslint-plugin-feature-sliced-project/actions
