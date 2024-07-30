import _chai from 'isotropic-dev-dependencies/lib/chai.js';
import _eslint from 'eslint';
import _filenameMustMatchPattern from '../js/filename-must-match-pattern.js';
import _mocha from 'isotropic-dev-dependencies/lib/mocha.js';

_mocha.describe('filename-must-match-pattern', () => {
    _mocha.it('should be a rule object', () => {
        _chai.expect(_filenameMustMatchPattern).to.be.an('object');
        _chai.expect(_filenameMustMatchPattern).to.have.property('create').that.is.a('function');
        _chai.expect(_filenameMustMatchPattern).to.have.property('meta').that.is.an('object');
    });

    _mocha.it('should pass eslint tests', () => {
        new _eslint.RuleTester({
            languageOptions: {
                ecmaVersion: 2025
            }
        }).run('filename-must-match-pattern', _filenameMustMatchPattern, {
            invalid: [{
                code: '',
                errors: [{
                    message: 'Filename \'code.js\' does not match /^a/v.',
                    type: 'Program'
                }],
                filename: 'code.js',
                options: [{
                    flags: 'v',
                    pattern: '^a'
                }]
            }],
            valid: [{
                code: '',
                filename: 'code.js',
                options: [{
                    flags: 'v',
                    pattern: '^c'
                }]
            }]
        });
    });
});
