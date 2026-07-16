import _arrayLiteralNewline from '../lib/array-literal-newline.js';
import _chai from 'isotropic-dev-dependencies/lib/chai.js';
import _eslint from 'eslint';
import _test from 'node:test';

_test.describe('array-literal-newline', () => {
    _test.it('should be a rule object', () => {
        _chai.expect(_arrayLiteralNewline).to.be.an('object');
        _chai.expect(_arrayLiteralNewline).to.have.property('create').that.is.a('function');
        _chai.expect(_arrayLiteralNewline).to.have.property('meta').that.is.an('object');
    });

    _test.it('should pass eslint tests', () => {
        new _eslint.RuleTester().run('array-literal-newline', _arrayLiteralNewline, {
            invalid: [{
                code: `[
]`,
                errors: [{
                    message: 'An empty array literal must not contain a line break.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                output: '[]'
            }, {
                code: `[
{},
{}
]`,
                errors: [{
                    message: 'A line break is not allowed here because every array element is an array or object literal.'
                }, {
                    message: 'A line break is not allowed here because every array element is an array or object literal.'
                }, {
                    message: 'A line break is not allowed here because every array element is an array or object literal.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                output: '[{}, {}]'
            }, {
                code: '[{}, x]',
                errors: [{
                    message: 'A line break is required here because at least one array element is not an array or object literal.'
                }, {
                    message: 'A line break is required here because at least one array element is not an array or object literal.'
                }, {
                    message: 'A line break is required here because at least one array element is not an array or object literal.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                output: `[
{},
x
]`
            }, {
                code: '[x]',
                errors: [{
                    message: 'A line break is required here because at least one array element is not an array or object literal.'
                }, {
                    message: 'A line break is required here because at least one array element is not an array or object literal.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                output: `[
x
]`
            }, {
                code: `[
/* comment */
]`,
                errors: [{
                    message: 'An empty array literal must not contain a line break.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                output: null
            }, {
                code: `[{},
/* comment */ {}]`,
                errors: [{
                    message: 'A line break is not allowed here because every array element is an array or object literal.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                output: null
            }],
            valid: [{
                code: '[]',
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: '[{}, [], {}, []]',
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `[{
    a: 'a'
}, {
    b: 'b'
}]`,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `[
    {
        a: 'a'
    },
    b
]`,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `[[
    1,
    2
], [
    3,
    4
]]`,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `[
    x
]`,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: '[1, , 2]',
                languageOptions: {
                    ecmaVersion: 2026
                }
            }]
        });
    });
});
