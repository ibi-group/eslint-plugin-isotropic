import _chai from 'isotropic-dev-dependencies/lib/chai.js';
import _eslint from 'eslint';
import _preferReflectApply from '../lib/prefer-reflect-apply.js';
import _test from 'node:test';

_test.describe('prefer-reflect-apply', () => {
    _test.it('should be a rule object', () => {
        _chai.expect(_preferReflectApply).to.be.an('object');
        _chai.expect(_preferReflectApply).to.have.property('create').that.is.a('function');
        _chai.expect(_preferReflectApply).to.have.property('meta').that.is.an('object');
    });

    _test.it('should pass eslint tests', () => {
        new _eslint.RuleTester().run('prefer-reflect-apply', _preferReflectApply, {
            invalid: [{
                code: `
                    someFunction.call(object, ...args);
                `,
                errors: [{
                    message: 'Avoid using Function.prototype.call, instead use Reflect.apply.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                output: `
                    Reflect.apply(someFunction, object, [...args]);
                `
            }, {
                code: `
                    someFunction.apply(object, args);
                `,
                errors: [{
                    message: 'Avoid using Function.prototype.apply, instead use Reflect.apply.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                output: `
                    Reflect.apply(someFunction, object, args);
                `
            }, {
                code: `
                    someFunction.apply(object, ...args);
                `,
                errors: [{
                    message: 'Avoid using Function.prototype.apply, instead use Reflect.apply.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                output: null
            }, {
                code: `
                    Function.prototype.apply.call(someFunction, object, args);
                `,
                errors: [{
                    message: 'Avoid using Function.prototype.call, instead use Reflect.apply.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                output: `
                    Reflect.apply(Function.prototype.apply, someFunction, [object, args]);
                `
            }, {
                code: `
                    someFunction.call(...args);
                `,
                errors: [{
                    message: 'Avoid using Function.prototype.call, instead use Reflect.apply.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                output: null
            }, {
                code: `
                    someFunction.apply(object);
                `,
                errors: [{
                    message: 'Avoid using Function.prototype.apply, instead use Reflect.apply.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                output: `
                    Reflect.apply(someFunction, object, []);
                `
            }, {
                code: `
                    someFunction.call();
                `,
                errors: [{
                    message: 'Avoid using Function.prototype.call, instead use Reflect.apply.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                output: `
                    Reflect.apply(someFunction, undefined, []);
                `
            }],
            valid: [{
                code: `
                    Reflect.apply(someFunction, args);
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    someFunction(...args);
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    someObject.someMethod(...args);
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }]
        });
    });
});
