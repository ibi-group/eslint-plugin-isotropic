# eslint-plugin-isotropic

[![npm version](https://img.shields.io/npm/v/eslint-plugin-isotropic.svg)](https://www.npmjs.com/package/eslint-plugin-isotropic)
[![License](https://img.shields.io/npm/l/eslint-plugin-isotropic.svg)](https://github.com/ibi-group/eslint-plugin-isotropic/blob/main/LICENSE)
![](https://img.shields.io/badge/tests-passing-brightgreen.svg)
![](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)

ESLint rules for Isotropic projects with sensible defaults and consistent conventions

## Installation

You'll need [ESLint](https://eslint.org/) v9.8.0 or above:

```sh
npm install eslint --save-dev
```

Next, install `eslint-plugin-isotropic`:

```sh
npm install eslint-plugin-isotropic --save-dev
```

## Usage

Create an `eslint.config.js` file in your project root directory to use the isotropic configuration:

```js
import _eslintPluginIsotropic from 'eslint-plugin-isotropic';

export default [
    _eslintPluginIsotropic.configs.isotropic
];
```

Or if using CommonJS:

```js
const _eslintPluginIsotropic = require('eslint-plugin-isotropic');

module.exports = [
    _eslintPluginIsotropic.configs.isotropic
];
```

### Using Individual Rules

If you prefer to use only specific rules from the plugin without the entire preset:

```js
import { defineConfig } from "eslint/config";
import _eslintPluginIsotropic from 'eslint-plugin-isotropic';

export default defineConfig([
    {
        files: ["**/*.js"],
        plugins: {
            isotropic: _eslintPluginIsotropic
        },
        rules: {
            'isotropic/prefer-date-now': 'error',
            'isotropic/prefer-reflect-apply': 'error'
            // Add other rules as needed
        }
    }
]);
```

## Features

This plugin provides a comprehensive set of rules and configurations:

- Includes and configures several established ESLint plugins:
  - [@eslint-community/eslint-plugin-eslint-comments](https://github.com/eslint-community/eslint-plugin-eslint-comments)
  - [@stylistic/eslint-plugin](https://github.com/eslint-stylistic/eslint-stylistic)
  - [eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x)
  - [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n)
  - [eslint-plugin-promise](https://github.com/eslint-community/eslint-plugin-promise)
  - [eslint-plugin-regexp](https://github.com/ota-meshi/eslint-plugin-regexp)
- Provides sensible defaults for all ESLint core rules
- Adds several custom rules for Isotropic projects

> **Note**: ESLint v9.x uses the new "flat config" format (`eslint.config.js`) instead of the deprecated `.eslintrc.*` configuration files. For more information, see the [ESLint Configuration Files Documentation](https://eslint.org/docs/latest/use/configure/configuration-files).

## Custom Rules

### `filename-must-match-pattern`

Enforces filename naming conventions through a configurable regular expression pattern.

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import _eslintPluginIsotropic from 'eslint-plugin-isotropic';

export default defineConfig([
    {
        files: ["**/*.js"],
        plugins: {
            isotropic: _eslintPluginIsotropic
        },
        rules: {
            'isotropic/filename-must-match-pattern': ['warn', {
                pattern: '^[\\da-z](?:[\\d\\-.a-z]*?[\\da-z])?$',
                flags: 'v'
            }]
        }
    }
]);
```

See [documentation](https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/filename-must-match-pattern.md) for more details.

### `filename-must-not-match-pattern`

Enforces that filenames do not match a specific pattern.

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import _eslintPluginIsotropic from 'eslint-plugin-isotropic';

export default defineConfig([
    {
        files: ["**/*.js"],
        plugins: {
            isotropic: _eslintPluginIsotropic
        },
        rules: {
            'isotropic/filename-must-not-match-pattern': ['warn', {
                pattern: '^index$',
                flags: 'v'
            }]
        }
    }
]);
```

See [documentation](https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/filename-must-not-match-pattern.md) for more details.

### `prefer-date-now`

Enforces using `Date.now()` instead of `new Date().getTime()` for better readability and performance.

```js
// ❌ Incorrect
const now = new Date().getTime();

// ✅ Correct
const now = Date.now();
```

See [documentation](https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/prefer-date-now.md) for more details.

### `prefer-reflect-apply`

Encourages using `Reflect.apply()` over `Function.prototype.apply()` and `Function.prototype.call()`.

```js
// ❌ Incorrect
someFunction.call(object, ...args);
someFunction.apply(object, args);

// ✅ Correct
Reflect.apply(someFunction, object, args);
```

See [documentation](https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/prefer-reflect-apply.md) for more details.

### `sort-keys`

Requires object keys to be sorted in a consistent order. This rule extends the functionality of ESLint's built-in `sort-keys` rule with natural sorting options.

```js
// ❌ Incorrect
const object = {
    c: 3,
    b: 2,
    a: 1
};

// ✅ Correct
const object = {
    a: 1,
    b: 2,
    c: 3
};
```

Configuration example:
```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import _eslintPluginIsotropic from 'eslint-plugin-isotropic';

export default defineConfig([
    {
        files: ["**/*.js"],
        plugins: {
            isotropic: _eslintPluginIsotropic
        },
        rules: {
            'isotropic/sort-keys': ['error', {
                caseSensitive: false,
                direction: 'asc',
                ignoreSpecialCharacters: true,
                prefixPositions: { _: 'last' }
            }]
        }
    }
]);
```

Options:
- `caseSensitive`: Whether sorting should be case-sensitive (default: `false`)
- `direction`: Sort direction, either `'asc'` or `'desc'` (default: `'asc'`)
- `ignoreSpecialCharacters`: Whether to ignore special characters during sorting (default: `true`)
- `prefixPositions`: Define positions for prefixed keys (default: `{ _: 'last' }`)

See [documentation](https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/sort-keys.md) for more details.

### `sort-vars`

Requires variable declarations to be sorted in a consistent order. This rule extends the functionality of ESLint's built-in `sort-vars` rule with natural sorting and handling of multiline declarations.

```js
// ❌ Incorrect
const c = 3,
    b = 2,
    a = 1;

const {
    c,
    b,
    a
} = object;

// ✅ Correct
const a = 1,
    b = 2,
    c = 3;

const {
    a,
    b,
    c
} = object;
```

Configuration example:
```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import _eslintPluginIsotropic from 'eslint-plugin-isotropic';

export default defineConfig([
    {
        files: ["**/*.js"],
        plugins: {
            isotropic: _eslintPluginIsotropic
        },
        rules: {
            'isotropic/sort-vars': ['error', {
                caseSensitive: false,
                direction: 'asc',
                ignoreSpecialCharacters: true,
                prefixPositions: {},
                strictEmptyLines: true
            }]
        }
    }
]);
```

Options:
- `caseSensitive`: Whether sorting should be case-sensitive (default: `false`)
- `direction`: Sort direction, either `'asc'` or `'desc'` (default: `'asc'`)
- `ignoreSpecialCharacters`: Whether to ignore special characters during sorting (default: `true`)
- `prefixPositions`: Define positions for prefixed variables (default: `{}`)
- `strictEmptyLines`: Whether to enforce rules about empty lines between variables (default: `true`)

See [documentation](https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/sort-vars.md) for more details.

### `top-scope-prefix`

Enforces that variables in the top scope of a module use a specific prefix, helping distinguish globals from local variables.

```js
// ❌ Incorrect
const constVariable = null;
function functionVariable() {}

// ✅ Correct
const _constVariable = null;
function _functionVariable() {}
```

Configuration example:
```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import _eslintPluginIsotropic from 'eslint-plugin-isotropic';

export default defineConfig([
    {
        files: ["**/*.js"],
        plugins: {
            isotropic: _eslintPluginIsotropic
        },
        rules: {
            'isotropic/top-scope-prefix': ['error', {
                prefix: '_'
            }]
        }
    }
]);
```

Options:
- `prefix`: The prefix that must be used for top-scope variables (default: `'_'`)

See [documentation](https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/top-scope-prefix.md) for more details.

## Key Linting Decisions

### Consistent Code Style

The plugin enforces a consistent code style through the Stylistic plugin, including:

- Consistent indentation (4 spaces)
- No semicolon-less code
- Consistent spacing in code
- Strict single quote preference for strings
- Enforced curly braces for all blocks

### Natural Sorting

For rules involving sorting (variables, object keys), the plugin uses [isotropic-natural-sort](https://github.com/ibi-group/isotropic-natural-sort) which provides sensible ordering that matches human expectations.

### Module Structure

The plugin encourages a clear module structure with:

- Underscore-prefixed module-level variables to distinguish them from local variables
- Consistent import ordering
- Proper module export patterns

### Modern JavaScript Features

The plugin encourages use of modern JavaScript features:

- ES modules over CommonJS
- Modern APIs like `Reflect.apply()` and `Date.now()`
- Consistent use of ES6+ features

## Combining with Other Configurations

You can combine the isotropic configuration with other configurations:

```js
// eslint.config.js
import js from "@eslint/js";
import _eslintPluginIsotropic from 'eslint-plugin-isotropic';

export default [
    js.configs.recommended,
    _eslintPluginIsotropic.configs.isotropic,
    {
        files: ["**/*.js"],
        rules: {
            // Override specific rules
            "no-unused-vars": "warn"
        }
    }
];
```

## Compatible ESLint Versions

This plugin requires ESLint 9.8.0 or later and uses ESLint's new flat config system.
