import _chai from 'isotropic-dev-dependencies/lib/chai.js';
import _eslint from 'eslint';
import _filenameMustNotMatchPattern from '../js/filename-must-not-match-pattern.js';
import _mocha from 'isotropic-dev-dependencies/lib/mocha.js';

_mocha.describe('filename-must-not-match-pattern', () => {
    _mocha.it('should be a rule object', () => {
        _chai.expect(_filenameMustNotMatchPattern).to.be.an('object');
        _chai.expect(_filenameMustNotMatchPattern).to.have.property('create').that.is.a('function');
        _chai.expect(_filenameMustNotMatchPattern).to.have.property('meta').that.is.an('object');
    });

    _mocha.it('should pass eslint tests', () => {
        new _eslint.RuleTester({
            languageOptions: {
                ecmaVersion: 2025
            }
        }).run('filename-must-not-match-pattern', _filenameMustNotMatchPattern, {
            invalid: [{
                code: '',
                errors: [{
                    message: 'Filename \'code.js\' matches /^c/v.',
                    type: 'Program'
                }],
                filename: 'code.js',
                options: [{
                    flags: 'v',
                    pattern: '^c'
                }]
            }],
            valid: [{
                code: '',
                filename: 'code.js',
                options: [{
                    flags: 'v',
                    pattern: '^a'
                }]
            }]
        });
    });
});
