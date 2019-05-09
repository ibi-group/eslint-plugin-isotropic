# prefer Reflect.apply (prefer-reflect-apply)
ESLint used to have a built-in rule called prefer-reflect. This rule suggested
using the ES6 Reflect API instead of other similar alternatives. This rule was
deprecated because the ES6 Reflect API was never intended to be a replacement
for other methods of doing similar things. However, many people agree that the
Reflect.apply method is better than either Function.prototype.call or
Function.prototype.apply. So prefer-reflect-apply is a new rule which is similar
to prefer-reflect but only regarding Reflect.apply.

## Rule Details
This rule checks for usage of Function.prototype.call and
Function.prototype.apply.

Examples of **incorrect** code for this rule:

```js
someFunction.call(object, ...args);
someFunction.apply(object, args);
Function.prototype.apply.call(someFunction, object, args);
```

Examples of **correct** code for this rule:

```js
Reflect.apply(someFunction, args);
```

## When Not To Use It
Don't use this rule if you want to use Function.prototype.call or
Function.prototype.apply.

## Further Reading
See [prefer-reflect](https://eslint.org/docs/rules/prefer-reflect)
