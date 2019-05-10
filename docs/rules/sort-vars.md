# require variable declarations to be sorted (sort-vars)
When declaring variables it's best to list them in an expected order so it's
easier to find certain variables when reading the code later.

This rule is very similar to ESLint's built-in sort-vars rule but it provides
some additional options to control how the variables are expected to be sorted.

## Rule Details
This rule checks variable declarations and object destructuring to verify
variables are sorted correctly.

Examples of **incorrect** code for this rule:

```js
const c = 3,
    b = 2,
    a = 1;

const {
    c,
    b,
    a
} = object;
```

Examples of **correct** code for this rule:

```js
const a = 1,
    b = 2,
    c = 3;

const {
    a,
    b,
    c
} = object;

// By default it is case insensitive.  This is configurable.
const a = 1,
    B = 2,
    c = 3;

// By default it ignores special characters, expecting them to be naturally
// sorted.  This is configurable.
const áeiou_a = 1,
    aęiou_b = 2,
    æiou_c = 3,
    aeioǜ_d = 4,
    aeiou_e = 5;

// Sometimes variable definitions reference other variables that are out of
// order. In this case, leave a blank line to begin a new ordered set.
const x = 1,
    y = 2,
    z = 3,

    a = x + y + z;

const {
    x,
    y,
    z,

    a = x + y + z
} = object;
```

### Options
The default options are:
```json
{
    "caseSensitive": false,
    "direction": "asc",
    "ignoreSpecialCharacters": true,
    "prefixPositions": {},
    "strictEmptyLines": true
}
```

## When Not To Use It
Don't use this rule if you don't want to notify about the order of variable
declarations.

## Further Reading
See [isotropic-natural-sort](https://github.com/ibi-group/isotropic-natural-sort)
