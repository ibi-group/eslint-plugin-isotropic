import _chai from 'isotropic-dev-dependencies/lib/chai.js';
import _eslint from 'eslint';
import _noUnnecessaryVariable from '../lib/no-unnecessary-variable.js';
import _test from 'node:test';

_test.describe('no-unnecessary-variable', () => {
    _test.it('should be a rule object', () => {
        _chai.expect(_noUnnecessaryVariable).to.be.an('object');
        _chai.expect(_noUnnecessaryVariable).to.have.property('create').that.is.a('function');
        _chai.expect(_noUnnecessaryVariable).to.have.property('meta').that.is.an('object');
    });

    _test.it('should pass eslint tests', () => {
        new _eslint.RuleTester().run('no-unnecessary-variable', _noUnnecessaryVariable, {
            invalid: [{
                code: `
                    const f = () => {
                        const value = computeValue();

                        return value;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const f = () => {
                        const value = computeValue();

                        doSomething();

                        doSomethingElse();

                        return value;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const f = () => {
                        const value = getObject();

                        return value.property;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const f = () => {
                        const error = computeError();

                        throw error;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const f = () => {
                        const value = computeValue();

                        if (condition) {
                            doSomething(value);
                        }
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const f = () => {
                        const unnecessary = computeValue(),
                            necessary = transform(unnecessary);

                        doSomething();

                        return necessary;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }, {
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = value => {
                        const cached = value.weird,
                            cached2 = value.yawn;

                        return cached + cached2;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }, {
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = config => {
                        const value = config.timeout;

                        config.retries = 3;

                        return value;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = object => {
                        object.a = 1;

                        const value = object.b;

                        return value;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = object => {
                        const value = object.a;

                        doSomething(value);

                        object.a = 1;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = (object, other) => {
                        const value = object.a;

                        other.a = 1;

                        return value;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = function (object) {
                        const value = object.a;

                        this.y = 1;

                        return value;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = value => {
                        const cached = value.a;

                        Unknown.y = 1;

                        return cached;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = callback => {
                        const value = callback();

                        return value;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = value => {
                        const negated = !value;

                        return negated;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = value => {
                        const result = compute(value);

                        return result;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = (object, index) => {
                        const value = object.a;

                        index++;

                        return value;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = value => {
                        const cached = value.a;

                        [
                            1
                        ].forEach(() => {
                            value.b = 1;
                        });

                        return cached;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = flag => {
                        const value = (flag = true);

                        return value;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = object => {
                        const value = object.a;

                        foo().bar = 1;

                        return value;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = string => {
                        const value = Date.parse(string);

                        return value;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = string => {
                        const value = Temporal.Instant.from(string);

                        return value;
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    class C {
                        method () {
                            const value = this.a;

                            this.b = 1;

                            return value;
                        }
                    }
                `,
                errors: [{
                    messageId: 'unnecessaryVariable'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }],
            valid: [{
                code: `
                    const _maximumCount = 5;

                    doSomething(_maximumCount);
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const f = () => {
                        const value = computeValue();

                        doSomething(value);

                        doSomethingElse(value);
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const f = () => {
                        let value = computeValue();

                        return value;
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const f = () => {
                        const {
                            value
                        } = source;

                        return value;
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const f = () => {
                        for (const item of items) {
                            doSomething(item);
                        }
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const f = () => {
                        const value = computeValue();

                        return () => value;
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const f = () => {
                        const value = computeValue();

                        return function () {
                            return value;
                        };
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const f = () => {
                        const value = computeValue();

                        function g () {
                            return value;
                        }

                        return g;
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const f = () => {
                        const value = computeValue();

                        for (const item of items) {
                            doSomething(item, value);
                        }
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const f = () => {
                        const value = computeValue();

                        while (condition) {
                            doSomething(value);
                        }
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const f = () => {
                        const value = computeValue();

                        for (let index = 0; index < 10; index += 1) {
                            doSomething(value);
                        }
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const drain = queue => {
                        const drainedCount = queue.length;

                        queue.length = 0;

                        return drainedCount;
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = value => {
                        const cached = value;

                        value += 1;

                        return cached;
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = values => {
                        const cached = values[0] + values[1];

                        values[0] += 1;

                        return cached;
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = values => {
                        const cached = values.reduce((positiveSum, value) => {
                            if (Number.isFinite(value) && value > 0) {
                                return positiveSum + value;
                            }

                            return positiveSum;
                        }, 0);

                        values.push(123);

                        return cached;
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = object => {
                        const value = object.value;

                        object.reset();

                        return value;
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = object => {
                        const value = object.a;

                        delete object.a;

                        return value;
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = object => {
                        const value = object.a;

                        object = {};

                        return value;
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = (matrix, row, col) => {
                        const value = matrix[row][col];

                        matrix[row][col] = 0;

                        return value;
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = values => {
                        const cached = values.reduce((sum, value) => sum + value, 0);

                        values[0] = 9;

                        return cached;
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    class C {
                        batchChanges () {
                            this.currentBatch = {};

                            later(() => {
                                if (this.currentBatch && !this.destroyed) {
                                    const currentBatch = this.currentBatch;

                                    this.currentBatch = null;

                                    this.publish('change', currentBatch);
                                }
                            });
                        }
                    }
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = () => {
                        const value = this.a;

                        this.a = 1;

                        return value;
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = () => {
                        const value = Date.now();

                        return value;
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const fn = () => {
                        const value = Temporal.Now.instant();

                        return value;
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }]
        });
    });
});
