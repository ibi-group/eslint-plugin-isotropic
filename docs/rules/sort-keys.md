# require object keys to be sorted (sort-keys)
When writing object literals it's best to list the properties in an expected
order so it's easier to find certain properties when reading the code later.

This rule is very similar to ESLint's built-in sort-keys rule but it provides
some additional options to control how the properties are expected to be sorted.

## Rule Details
This rule checks object literals to verify property definitions are sorted
correctly.

Examples of **incorrect** code for this rule:

```js
const object = {
    c: 3,
    b: 2,
    a: 1
};

// This rule checks computed properties which have a simple name as well
const object = {
    c: 3,
    [b]: 2,
    a: 1
};
```

Examples of **correct** code for this rule:

```js
const object = {
    a: 1,
    b: 2,
    c: 3
};

// By default it is case insensitive.  This is configurable.
const object = {
    a: 1,
    B: 2,
    c: 3
};

// By default it ignores special characters, expecting them to be naturally
// sorted.  This is configurable.
const object = {
    'áeiou_a': 1,
    'aęiou_b': 2,
    'æiou_c': 3,
    'aeioǜ_d': 4,
    'aeiou_e': 5
};

// By default _ prefixed properties are sorted last.  This is configurable
const object = {
    x: 1,
    y: 2,
    z: 3,
    _a: 4,
    _b: 5,
    _c: 6
};

// It expects numbers to be naturally sorted.
const object = {
    1: 1,
    2: 2,
    3: 3,
    10: 4,
    20: 5,
    30: 6
};
```

### Options
The default options are:
```json
{
    "caseSensitive": false,
    "direction": "asc",
    "ignoreSpecialCharacters": true,
    "prefixPositions": {
        "_": "last"
    }
}
```

## When Not To Use It
Don't use this rule if you don't want to notify about the order of object
properties.

## Further Reading
See [isotropic-natural-sort](https://github.com/ibi-group/isotropic-natural-sort)
