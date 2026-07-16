# disallow unnecessary `await` of a returned value (no-unnecessary-return-await)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/use/command-line-interface#--fix).

ESLint removed its built-in `no-return-await` rule, with the reasoning that a
[V8 optimization](https://v8.dev/blog/fast-async) eliminated the extra microtask
that `return await` used to cost, so there is no longer any performance reason to
avoid it.

This rule takes a different position. If the performance is identical either way,
then an `await` that does not change behavior is simply unnecessary syntax. Mixing
`return await promise;` and `return promise;` with no consistent reasoning is
sloppy. When the `await` is unnecessary, it should not be allowed.

## Rule Details

This rule reports `await` of a value that is immediately returned (either with a
`return` statement or as the body of an arrow function) when the `await` does not
affect the program's behavior.

The `await` *does* affect behavior — and is therefore allowed — when removing it
would change how errors or cleanup are handled. That is the case when the returned
value is awaited inside a `try` block, or inside a `catch` block of a `try`
statement that also has a `finally` block. In those positions the `await` keeps
the promise within the scope of the surrounding error handling, so it is not
redundant.

Examples of **incorrect** code for this rule:

```js
const f = async () => {
    return await getValue();
};

const g = async () => await getValue();

const h = async () => {
    try {
        doStuff();
    } catch (error) {
        // No `finally`, so the `await` here is redundant.
        return await getValue();
    }
};
```

Examples of **correct** code for this rule:

```js
const f = async () => {
    return getValue();
};

const g = async () => {
    try {
        // The `await` lets the local `catch` handle a rejection.
        return await getValue();
    } catch (error) {
        handleError(error);
    }
};

const h = async () => {
    try {
        doStuff();
    } catch (error) {
        // The `await` affects when the `finally` block runs.
        return await getValue();
    } finally {
        cleanUp();
    }
};
```

## When Not To Use It

Don't use this rule if you prefer to always write `return await` for consistency,
or if you rely on the slightly improved asynchronous stack traces that `return
await` can produce in some debuggers.
