# prefer Date.now() (prefer-date-name)
There are two primary ways of obtaining the current time. The now method is more
semantically evident and shorter, so it should be the one that is used.

## Rule Details
This rule checks for usage of new Date().getTime().

Examples of **incorrect** code for this rule:

```js
const now = new Date().getTime();
```

Examples of **correct** code for this rule:

```js
const date = new Date(),
    now = Date.now(),
    someOtherTime = new Date(someValue).getTime();
```

## When Not To Use It
Don't use this rule if you want to use new Date().getTime().
