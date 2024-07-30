# require filename does not match pattern (filename-must-not-match-pattern)
Enforce file naming conventions.

## Rule Details
This rule checks if the filename doesn't match the given pattern.

Examples of **incorrect** code for this rule:

The pattern is set to '^c' and the filename is 'code.js'.

Examples of **correct** code for this rule:

The pattern is set to '^a' and the filename is 'code.js'.

### Options
The options are:
```json
{
    "flags": "optional string",
    "pattern": "required string"
}
```

The pattern and flags are passed to the RegExp constructor and the regular
expression is used to test the filename. The file's basename is tested without
the filepath and without the extension.

## When Not To Use It
Don't use this rule if you don't want to enforce file naming conventions.
