# require prefixed variables in top scope (top-scope-prefix)
When declaring variables it can be helpful to distinguish those in the top scope
of a module or a script from the rest. This rule ensures that variables declared
in the top scope use a specific prefix and variables declared elsewhere do not
use that prefix.

## Rule Details
Examples of **incorrect** code for this rule:

```js
const constVariable = null;

const {
    destructureProperty,
    _renameDestructureProperty: renameDestructureProperty
} = {};

function functionVariable (_functionArgument) {
    const _functionConstVariable = null;

    const {
        _functionDestructureProperty,
        functionRenameDestructureProperty: _functionRenameDestructureProperty
    } = {};

    function _functionFunctionVariable (_functionFunctionArgument) {};

    let _functionLetVariable;

    var _functionVarVariable;
};

import importVariable from 'module';

let letVariable;

import {
    _renameImportVariable as renameImportVariable
} from 'module';

var varVariable;
```

Examples of **correct** code for this rule:

```js
const _constVariable = null;

const {
    _destructureProperty,
    renameDestructureProperty: _renameDestructureProperty
} = {};

function _functionVariable (functionArgument) {
    const functionConstVariable = null;

    const {
        functionDestructureProperty,
        _functionRenameDestructureProperty: functionRenameDestructureProperty
    } = {};

    function functionFunctionVariable (functionFunctionArgument) {};

    let functionLetVariable;

    var functionVarVariable;
};

import _importVariable from 'module';

let _letVariable;

import {
    renameImportVariable as _renameImportVariable
} from 'module';

var _varVariable;
```

### Options
The default options are:
```json
{
    "prefix": "_"
}
```

## When Not To Use It
Don't use this rule if you don't want to impose a prefix on top scope variables.
