# eslint-plugin-feature-sliced-project

[![npm version](https://img.shields.io/npm/v/eslint-plugin-feature-sliced-project.svg)](https://www.npmjs.com/package/eslint-plugin-feature-sliced-project)
[![Downloads](https://img.shields.io/npm/dm/eslint-plugin-feature-sliced-project.svg)](https://www.npmjs.com/package/eslint-plugin-feature-sliced-project)
[![Build Status](https://github.com/g-serg-work/eslint-plugin-feature-sliced-project/actions/workflows/node.js.yml/badge.svg)](https://github.com/g-serg-work/eslint-plugin-feature-sliced-project/actions)

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
        "feature-sliced-project/relative-import-check": "error"
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

| Name                                                         | Description                                  | 🔧 |
| :----------------------------------------------------------- | :------------------------------------------- | :- |
| [relative-import-check](docs/rules/relative-import-check.md) | Within one slice, all paths must be relative | 🔧 |

<!-- end auto-generated rules list -->
