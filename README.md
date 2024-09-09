# eslint-plugin-feature-sliced-project ![example workflow](https://github.com/g-serg-work/eslint-plugin-feature-sliced-project/actions/workflows/node.js.yml/badge.svg?event=push)

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

TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).

<!-- end auto-generated configs list -->

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                         | Description                                  | 🔧 |
| :----------------------------------------------------------- | :------------------------------------------- | :- |
| [relative-import-check](docs/rules/relative-import-check.md) | Within one slice, all paths must be relative | 🔧 |

<!-- end auto-generated rules list -->
