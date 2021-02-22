import _chai from 'isotropic-dev-dependencies/lib/chai.js';
import _eslint from 'eslint';
import _mocha from 'isotropic-dev-dependencies/lib/mocha.js';
import _preferReflectApply from '../js/prefer-reflect-apply.js';

_mocha.describe('preferReflectApply', () => {
    _mocha.it('should be a rule object', () => {
        _chai.expect(_preferReflectApply).to.be.an('object');
        _chai.expect(_preferReflectApply).to.have.property('create').that.is.a('function');
        _chai.expect(_preferReflectApply).to.have.property('meta').that.is.an('object');
    });

    _mocha.it('should pass eslint tests', () => {
        new _eslint.RuleTester().run('prefer-reflect-apply', _preferReflectApply, {
            invalid: [{
                code: `
                    someFunction.call(object, ...args);
                `,
                errors: [{
                    message: 'Avoid using Function.prototype.call, instead use Reflect.apply.',
                    type: 'CallExpression'
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    someFunction.apply(object, ...args);
                `,
                errors: [{
                    message: 'Avoid using Function.prototype.apply, instead use Reflect.apply.',
                    type: 'CallExpression'
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    Function.prototype.apply.call(someFunction, object, args);
                `,
                errors: [{
                    message: 'Avoid using Function.prototype.call, instead use Reflect.apply.',
                    type: 'CallExpression'
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }],
            valid: [{
                code: `
                    Reflect.apply(someFunction, args);
                `,
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    someFunction(...args);
                `,
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    someObject.someMethod(...args);
                `,
                parserOptions: {
                    ecmaVersion: 2020
                }
            }]
        });
    });
});
