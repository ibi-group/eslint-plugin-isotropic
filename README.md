# eslint-plugin-isotropic

[![npm version](https://img.shields.io/npm/v/eslint-plugin-isotropic.svg)](https://www.npmjs.com/package/eslint-plugin-isotropic)
[![License](https://img.shields.io/npm/l/eslint-plugin-isotropic.svg)](https://github.com/ibi-group/eslint-plugin-isotropic/blob/main/LICENSE)
![](https://img.shields.io/badge/tests-passing-brightgreen.svg)
![](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)

ESLint rules for Isotropic projects with sensible defaults and consistent conventions

## Installation

You'll need [ESLint](https://eslint.org/) v10.5.0 or above:

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

> **Note**: ESLint v10.x uses the "flat config" format (`eslint.config.js`). For more information, see the [ESLint Configuration Files Documentation](https://eslint.org/docs/latest/use/configure/configuration-files).

## Custom Rules

### `array-literal-newline`

Enforces consistent line breaks in array literals, and is automatically fixable with the `--fix` option. An empty array stays collapsed (`[]`); when every element is itself an array or object literal the elements "hug" the brackets, separated only by a comma and a space; and when any element is not an array or object literal, every element is placed on its own line.

This rule covers array literals only. Object literal formatting (each property on its own line, empty objects collapsed) is already handled by the `object-curly-newline`, `object-property-newline`, and `object-curly-spacing` rules, which the isotropic config enables. The behavior here cannot be reproduced with the `@stylistic` array rules, because they cannot express the "hugging" exception for arrays whose elements are all literals.

```js
// ✅ Every element is a literal, so they hug the brackets
const a = [{
    a: 'a'
}, {
    b: 'b'
}];

// ✅ An element is not a literal, so every element is on its own line
const b = [
    {
        a: 'a'
    },
    someVariable
];

// ✅ Empty literals stay collapsed
const c = [{}, [], {}, []];
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
            'isotropic/array-literal-newline': 'error'
        }
    }
]);
```

See [documentation](https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/array-literal-newline.md) for more details.

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

### `logger-error-property`

Requires errors to be logged as the `error` property of the metadata object when using `isotropic-logger`, so that the logger's error serializer is applied. Only modules that import both `isotropic-logger` and `isotropic-error` are checked.

```js
import _Error from 'isotropic-error';
import _logger from 'isotropic-logger';

// ❌ Incorrect
_logger.error(_Error({
    message: 'An error occurred'
}), 'An error occurred');

// ✅ Correct
_logger.error({
    error: _Error({
        message: 'An error occurred'
    })
}, 'An error occurred');
```

See [documentation](https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/logger-error-property.md) for more details.

### `no-unnecessary-return-await`

Disallows `return await` (and the equivalent arrow body `async () => await x`) when the `await` is unnecessary, that is, when it is not inside a `try` block or a `catch` block of a `try` that has a `finally`. This rule is automatically fixable with the `--fix` option.

```js
// ❌ Incorrect
const f = async () => {
    return await getValue();
};

// ✅ Correct
const f = async () => {
    return getValue();
};
```

See [documentation](https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/no-unnecessary-return-await.md) for more details.

### `no-unnecessary-variable`

Disallows a `const` whose value is read exactly once when inlining it cannot change behavior. Module-scoped constants, `let`/`var`, destructuring, values that mutate, and values that capture the current time are exempt.

```js
// ❌ Incorrect
const getTwelve = () => {
    const twelve = 12;

    return twelve;
};

// ✅ Correct
const getTwelve = () => 12;
```

See [documentation](https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/no-unnecessary-variable.md) for more details.

### `prefer-reflect-apply`

Encourages using `Reflect.apply()` over `Function.prototype.apply()` and `Function.prototype.call()`. This rule is automatically fixable with the `--fix` option.

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
- Modern APIs like `Reflect.apply()` and `Temporal` (the `Date` global is disallowed in favor of `Temporal`)
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

This plugin requires ESLint 10.5.0 or later and uses ESLint's flat config system.
