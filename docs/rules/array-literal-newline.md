# enforce consistent line breaks in array literals (array-literal-newline)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/use/command-line-interface#--fix).

This rule controls where line breaks are allowed and required inside array
literals (`ArrayExpression`). It does not apply to array destructuring patterns
(`ArrayPattern`), and it does not control the formatting of object literals,
that is handled by the `object-curly-newline`, `object-property-newline`, and
`object-curly-spacing` rules.

## Rule Details
The rule enforces three cases:

1. An empty array literal must be written as `[]`, with no line break between
   the brackets.
2. When every element of the array is itself an array or object literal, the
   elements "hug" the brackets and are separated only by a comma and a single
   space, with no line breaks between them. Each element may still span multiple
   lines internally (an object literal with properties will still place each
   property on its own line).
3. When at least one element is not an array or object literal, every element is
   placed on its own line, including any array or object literals.

Examples of **incorrect** code for this rule:

```js
// an empty array must not contain a line break
const a = [
];

// every element is a literal, so they must not be separated by line breaks
const b = [
    {
        a: 'a'
    },
    {
        b: 'b'
    }
];

// an element is not a literal, so every element must be on its own line
const c = [{ a: 'a' }, someVariable];
```

Examples of **correct** code for this rule:

```js
const empty = [],
    allObjectLiterals = [{
        a: 'a'
    }, {
        b: 'b'
    }, {
        c: 'c'
    }],
    allArrayLiterals = [[
        0,
        1,
        2
    ], [
        3,
        4,
        5
    ]],
    allEmptyLiterals = [{}, [], {}, []],
    mixedElements = [
        {
            a: 'a'
        },
        {
            b: 'b'
        },
        someVariable
    ];
```

## When Not To Use It
Don't use this rule if you do not want to enforce this specific array literal
formatting, or if you prefer to rely solely on the `@stylistic` array formatting
rules (`array-bracket-newline` and `array-element-newline`), which cannot express
the "hugging" exception for arrays whose elements are all array or object
literals.
