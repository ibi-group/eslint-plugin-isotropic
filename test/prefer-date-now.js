import _chai from 'isotropic-dev-dependencies/lib/chai.js';
import _eslint from 'eslint';
import _mocha from 'isotropic-dev-dependencies/lib/mocha.js';
import _preferDateNow from '../js/prefer-date-now.js';

_mocha.describe('prefer-date-now', () => {
    _mocha.it('should be a rule object', () => {
        _chai.expect(_preferDateNow).to.be.an('object');
        _chai.expect(_preferDateNow).to.have.property('create').that.is.a('function');
        _chai.expect(_preferDateNow).to.have.property('meta').that.is.an('object');
    });

    _mocha.it('should pass eslint tests', () => {
        new _eslint.RuleTester({
            languageOptions: {
                ecmaVersion: 2025
            }
        }).run('prefer-date-now', _preferDateNow, {
            invalid: [{
                code: `
                    const now = new Date().getTime();
                `,
                errors: [{
                    message: 'Avoid using new Date().getTime(), instead use Date.now().',
                    type: 'CallExpression'
                }]
            }],
            valid: [{
                code: `
                    const date = new Date(),
                        now = Date.now(),
                        someOtherTime = new Date(someValue).getTime();
                `
            }]
        });
    });
});
