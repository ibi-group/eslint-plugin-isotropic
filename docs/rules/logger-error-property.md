# require errors to be logged as the `error` property with isotropic-logger (logger-error-property)

`isotropic-logger` defines a serializer for the `error` property. To get the
benefit of that serializer, an error must be passed as the `error` property of the
metadata object, not as a bare argument or under a different property name:

```js
import _Error from 'isotropic-error';
import _logger from 'isotropic-logger';

// ...

try {
    // ...
} catch (error) {
    _logger.error({
        error: _Error({
            error,
            message: 'An error occurred'
        })
    }, 'An error occurred');
}
```

This rule reports errors that are logged without following that pattern.

## Rule Details

The rule is intentionally conservative so that it does not produce false
positives. It can only recognize two things with certainty, so it relies on both:

1. **The logger.** It tracks the default import from `isotropic-logger` and only
   inspects calls to that binding's logging methods (`debug`, `error`, `fatal`,
   `info`, `trace`, and `warn`). It cannot recognize a logger that is referenced
   some other way, such as a logger instance stored on an object or received as a
   function parameter.
2. **The error.** It tracks the default import from `isotropic-error` and treats a
   call to that binding (for example `_Error(...)`) as an error value.

Within a recognized logging call, an `isotropic-error` value is reported when it
is passed as a bare argument, or when it appears as a property of the metadata
object under a key other than `error`.

Because both the logger and the error must be recognized, the rule only has an
effect in modules that import both `isotropic-logger` and `isotropic-error`, and
it will not flag errors that are held in variables (since a variable cannot be
known to be an error).

Examples of **incorrect** code for this rule:

```js
import _Error from 'isotropic-error';
import _logger from 'isotropic-logger';

// Passed as a bare argument instead of `{ error: ... }`.
_logger.error(_Error({
    message: 'An error occurred'
}), 'An error occurred');

// Logged under the wrong property name.
_logger.error({
    err: _Error({
        message: 'An error occurred'
    })
}, 'An error occurred');
```

Examples of **correct** code for this rule:

```js
import _Error from 'isotropic-error';
import _logger from 'isotropic-logger';

_logger.error({
    error: _Error({
        message: 'An error occurred'
    })
}, 'An error occurred');

// Metadata without an error is unaffected.
_logger.info({
    userId: 5
}, 'A message');
```

## When Not To Use It

Don't use this rule if you don't use `isotropic-logger`, or if you intentionally
log `isotropic-error` values under property names other than `error`.
