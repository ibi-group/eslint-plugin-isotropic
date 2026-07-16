# disallow variables that are only used once (no-unnecessary-variable)

A variable stores a value. If the variable is only referenced a single time,
and nothing changes between the variable's initialization and the variable's
reference, what was the purpose of storing that value in the first place?
Such a variable is usually unnecessary. Instead of storing the value in a
variable, the value can be placed directly where it is used. This removes a
variable the reader has to track and keeps the surrounding code shorter and
easier to scan.

```js
const getTwelve = () => {
    const twelve = 12; // Unnecessary variable

    return twelve; // Only referenced once
};

// Inlined:
const getTwelve = () => 12;
```

When is a variable necessary? The most common necessary variable is one that is
referenced multiple times. It might store the result of an expression. By
storing the expression's result in a variable, it prevents having to evaluate
the expression multiple times. Another kind of necessary variable is one that
caches a value before that value is mutated. In this case, the expression that
is stored in the variable can not simply be moved to where the variable is
referenced, because the value would have changed in the interim.

## Rule Details

This rule reports a `const` declaration whose variable is read exactly once. Only
simple `const name = value;` declarations are considered.

The single read is **ignored** and not reported as an error in these cases,
because in each case the value it holds is not simply an inlinable duplicate:

- **Module-scoped (top-level) variables.** A `const` declared at the top level of a
  module is never reported. Hoisting shared configuration to the top of a file is a
  reasonable pattern even when a given value happens to be referenced once.

  ```js
  const _maximumRetryCount = 5;

  const retry = task => attemptWithLimit(task, _maximumRetryCount);
  ```

- **The single use is inside a loop.** The value is read once in the source but
  potentially many times at runtime, so the variable holds it across iterations.

  ```js
  const scaleAll = values => {
      const multiplier = computeMultiplier();

      for (const value of values) {
          record(value * multiplier);
      }
  };
  ```

- **The single use is inside a nested function.** The value is captured by a
  closure and may be read each time that function runs, or not at all.

  ```js
  const makeGreeter = () => {
      const greeting = buildGreeting();

      return name => `${greeting}, ${name}`;
  };
  ```

- **The variable captures the current time.** The value references `Date.now` or
`Temporal.Now`. The initialization of the variable is necessary regardless of
the number of times it is referenced later.
```js
const measureDuration = async () => {
    const beginTime = Temporal.Now.instant().epochMilliseconds;

    await someTask();

    return Temporal.Now.instant().epochMilliseconds - beginTime;
};
```

### Values that change before they are used
Inlining a variable moves its initializer expression down to the point of use.
For anything the initializer expression reads, if the value changes in between
the variable initialization and the variable reference, then inlining isn't
safe. The rule tracks the variables and properties an initializer expression
reads, and if any of them is altered before the single use, the variable is not
reported as unnecessary.

An initializer expression's value is considered altered when, between the
declaration and the use, one of the things it read is reassigned, has a property
assigned, is incremented, has a property deleted, or has a method called on it:

```js
// Not reported: queue.length is read, then changed before drainedCount is used.
const drain = queue => {
    const drainedCount = queue.length;

    queue.length = 0;

    return drainedCount;
};

// Not reported: value itself is reassigned before cached is used.
const capture = value => {
    const cached = value;

    value += 1;

    return cached;
};

// Not reported: a method call may mutate the array the sum was computed from.
const total = values => {
    const sum = values.reduce((runningTotal, value) => runningTotal + value, 0);

    values.push(0);

    return sum;
};
```

This tracking is property-aware: changing a *different* property than the one that
was read does not protect the variable, so it is still reported.

```js
// Reported: reading config.timeout is unaffected by writing config.retries.
const getTimeout = config => {
    const timeout = config.timeout;

    config.retries = 3;

    return timeout;
};
```

### Limitations

The rule only sees changes it can trace syntactically. It cannot see a change made
behind a getter or setter, one made inside another function that receives the
value, or one made through a second variable that aliases the same object. In those
cases it will report a variable that is actually doing necessary work. Disable the
rule on that line:
```js
const summarize = report => {
    // normalize() reassigns report.entries internally. In this case, entryCount
    // is a necessary variable because it caches a value that mutates before the
    // variable's reference. The rule cannot see this mutation through the
    // function call, so entryCount will be reported as unnecessary.

    // A false-positive like this can be silenced with an ESLint disable comment:
    // eslint-disable-next-line isotropic/no-unnecessary-variable -- necessary
    const entryCount = report.entries.length;

    normalize(report);

    return entryCount;
};
```

Examples of **incorrect** code for this rule:

```js
// Declared, then immediately returned.
const getResult = () => {
    const result = computeResult();

    return result;
};

// Declared, then thrown.
const fail = () => {
    const error = buildError();

    throw error;
};

// Used once, even with unrelated statements in between.
const report = items => {
    const total = sum(items);

    logProgress();
    notifyListeners();

    return total;
};

// Used once as an argument.
const send = data => {
    const message = format(data);

    transport.write(message);
};

// Used once inside a condition.
const handle = event => {
    const payload = parse(event);

    if (event.ready) {
        process(payload);
    }
};

// Each glue variable is used once to build the next value.
const load = path => {
    const raw = read(path);
    const parsed = parse(raw);

    return parsed;
};

// A different property is changed than the one that was read.
const price = order => {
    const subtotal = order.subtotal;

    order.tax = computeTax(order);

    return subtotal;
};
```

Examples of **correct** code for this rule:

```js
// Used more than once.
const f = () => {
    const value = computeValue();

    doSomething(value);
    doSomethingElse(value);
};

// Module-scoped constant.
const _configuredValue = 12;

const g = () => doSomething(_configuredValue);

// let and var are not considered.
const h = () => {
    let value = computeValue();

    return value;
};

// Destructuring is not considered.
const i = () => {
    const {
        value
    } = source;

    return value;
};

// Capturing the current time is not considered.
const j = () => {
    const dateNow = Date.now(),
        temporalNow = Temporal.Now.instant();

    return [
        dateNow,
        temporalNow
    ];
};

// Single use inside a loop.
const k = values => {
    const limit = computeLimit();

    for (const value of values) {
        if (value > limit) {
            record(value);
        }
    }
};

// Single use inside a nested function.
const l = () => {
    const handler = createHandler();

    return event => handler.run(event);
};

// The value read is changed before it is used.
const m = stack => {
    const top = stack[stack.length - 1];

    stack.pop();

    return top;
};
```

## When Not To Use It

Don't use this rule if you prefer to name intermediate values for readability
even when they are only used once. Because the rule cannot detect every mutation
that makes a variable necessary (see Limitations), some projects may find it
more useful as a warning instead of an error.
