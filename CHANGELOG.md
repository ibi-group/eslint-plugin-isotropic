# Changelog

## 0.9.1 - 2026-07-21

### Changed

**`no-unnecessary-variable` recognizes more time-capture expressions.** The rule exempts a variable that captures the current time, because such a variable is meaningful even when referenced once. It pins a moment that would otherwise be re-read at a different instant.

The set of recognized time captures was expanded from `new Date()` and `Date.now()` to also include:

- `performance.now()`
- `Temporal.Now.*`
- `process.hrtime()` and `process.uptime()`, including when `process` is imported as `node:process` under any local binding name
- `logger.task()` from `isotropic-logger`, which captures a begin time internally

Local binding names are resolved from the import statements, so aliased imports are handled.

This makes the rule less aggressive. Code that 0.9.0 flagged may now pass. It will not introduce new errors.

## 0.9.0 - 2026-07-15

### Added

Four new rules:

- **`array-literal-newline`** (fixable) - enforces consistent line breaks inside array literals. Applies to `ArrayExpression` only, not to array destructuring patterns, and does not touch object literals, which remain the province of `object-curly-newline` and friends.
- **`logger-error-property`** - requires that an error passed to `isotropic-logger` be supplied as the `error` property of the metadata object rather than as a bare argument or under some other name. `isotropic-logger` registers a serializer keyed on `error`. Logging under any other name silently loses the serialization, producing a useless log record. This rule catches that at lint time.
- **`no-unnecessary-return-await`** (fixable) - disallows `await` on a returned value. ESLint removed its built-in `no-return-await` on the grounds that a V8 optimization erased the performance cost. This rule takes the position that if the performance is identical, an `await` that changes nothing is just noise, and consistency is worth enforcing.
- **`no-unnecessary-variable`** - disallows a variable that is referenced exactly once when nothing changes between its initialization and its use. Time captures are exempt.

### Breaking changes

**The `prefer-date-now` rule was removed.** It is superseded by the equivalent built-in ESLint rule. If you referenced `isotropic/prefer-date-now` explicitly in your own configuration, remove or replace that reference. An unknown rule name is an error under flat config.

**Expect new lint errors.** The four rules above are enabled in the shared configuration. `no-unnecessary-variable` in particular tends to flag a fair amount of existing code.

**Bundled plugin and tool versions moved up major versions:**

| | 0.8.1 | 0.9.0 |
| --- | --- | --- |
| `eslint` | `~9.8.0` | `~10.7.0` |
| `@stylistic/eslint-plugin` | `~2.4.0` | `~5.10.0` |
| `eslint-plugin-import-x` | `~3.1.0` | `~4.17.1` |
| `eslint-plugin-n` | `~17.10.1` | `~18.2.2` |
| `eslint-plugin-regexp` | `~2.6.0` | `~3.1.1` |
| `@eslint-community/eslint-plugin-eslint-comments` | `~4.3.0` | `~4.7.2` |
| `globals` | `~15.8.0` | `~17.6.0` |
| `isotropic-natural-sort` | `~0.8.1` | `~0.9.0` |

ESLint 10 is itself a major release with its own removals and default changes; consult its migration guide if you extend this configuration.

**The package now ships source directly instead of a Babel build.** The `build` script and Babel toolchain were removed, source moved from `js/` to `lib/`, and rule modules are published unminified. Rule implementations sit at `lib/<rule-name>.js`.

#### Migration

1. Upgrade `isotropic-dev-dependencies` to `~0.4.0` at the same time; the two are versioned together.
2. Remove any explicit reference to `isotropic/prefer-date-now`.
3. Run `eslint --fix`. `array-literal-newline` and `no-unnecessary-return-await` are auto-fixable and will resolve most new findings.
4. Address `no-unnecessary-variable` and `logger-error-property` findings by hand.

### Changed

- Rule documentation was expanded, with a `docs/rules/*.md` file for every rule.
- The redundant `eslint plugin` keyword was dropped in favor of `eslint-plugin`.
- Recommends `node ^26.5.0` / `npm ^11.17.0`.

## 0.8.1 - 2025-04-10

### Changed

- Documentation only.
- The README was expanded.
- Tool version bumps.

## 0.8.0 - 2024-07-30

### Breaking changes

**The package is now an ES module** and the configuration moved to ESLint flat config, requiring ESLint 9. Consuming packages replace their `eslintConfig` block in `package.json` with an `eslint.config.js`.

**Bundled plugins moved to their flat-config-compatible major versions**, including `@stylistic/eslint-plugin` in place of the deprecated stylistic rules removed from ESLint core, and `eslint-plugin-import-x` in place of `eslint-plugin-import`.

Rules that ESLint 9 deprecated or removed are no longer configured. Because ESLint core moved all formatting rules to `@stylistic`, any rule name you referenced with a bare `indent`, `quotes`, `semi`, and so on must be renamed to its `@stylistic/` equivalent.

### Changed

- Recommends `node ^22.5.1` / `npm ^10.8.2`.

## 0.7.0 - 2021-02-22

### Changed

- The package's own development toolchain was moved to `isotropic-dev-dependencies`.
- Recommends `node ^14.15.5` / `npm ^7.5.4`.

## 0.6.0 - 2020-07-27

### Added

- **`prefer-date-now`** - prefer `Date.now()` over the equivalent longer forms.
- **More bundled plugins were enabled**, with the plugin namespace retained so rule names remain unambiguous.

### Fixed

An issue with how blank lines inside function bodies were handled.

### Changed

- Regular expressions used by several rules were updated.
- Recommends `node ^12.18.3` / `npm ^6.14.6`.

## 0.5.0 - 2019-05-10

### Added

- **`top-scope-prefix`** - enforces the naming convention for top-level scope bindings.
- **`sort-vars`** - enforces sorted variable declarations within a declaration list.
- **`prefer-reflect-apply`** - prefer `Reflect.apply` over `Function.prototype.apply` and `call`.

### Changed

Implementation cleanup across the existing rules.

## 0.4.2 - 2019-05-08

### Changed

Dependency bumps only.

## 0.4.1 - 2019-05-08

### Changed

Dependency bumps only.

## 0.4.0 - 2019-05-08

### Changed

Dependency updates.

## 0.3.0 - 2019-02-18

### Changed

Dependency updates.

## 0.2.0 - 2018-11-25

### Changed

Dependency updates.

## 0.1.0 - 2017-09-12

Initial release.

- Provides the shared ESLint configuration used across Isotropic, exposed as `plugin:isotropic/isotropic`, replacing the previous `eslint-config-isotropic` package.
- Bundles the plugins the configuration depends on, so consuming packages need only this one dev dependency.
- Ships custom rules including `filename-must-match-pattern`, `filename-must-not-match-pattern`, and `sort-keys`.
- Recommends `node ^8.4.0` / `npm ^5.4.1`.
