import _chai from 'chai';
import _eslint from 'eslint';
import _mocha from 'mocha';
import _sortVars from '../js/sort-vars.js';

_mocha.describe('sortVars', () => {
    _mocha.it('should be a rule object', () => {
        _chai.expect(_sortVars).to.be.an('object');
        _chai.expect(_sortVars).to.have.property('create').that.is.a('function');
        _chai.expect(_sortVars).to.have.property('meta').that.is.an('object');
    });

    _mocha.it('should pass eslint tests', () => {
        const invalid = [{
                code: `
                    const c = 3,
                        b = 2,
                        a = 1;
                `,
                errors: [{
                    message: 'Expected variables to be in order. \'b\' should be before \'c\'.',
                    type: 'Identifier'
                }, {
                    message: 'Expected variables to be in order. \'a\' should be before \'b\'.',
                    type: 'Identifier'
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const a = 3,
                        b = 2,
                        c = 1;
                `,
                errors: [{
                    message: 'Expected variables to be in order. \'b\' should be before \'a\'.',
                    type: 'Identifier'
                }, {
                    message: 'Expected variables to be in order. \'c\' should be before \'b\'.',
                    type: 'Identifier'
                }],
                options: [{
                    direction: 'desc'
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const a = 2,
                        B = 1,
                        c = 3;
                `,
                errors: [{
                    message: 'Expected variables to be in order. \'B\' should be before \'a\'.',
                    type: 'Identifier'
                }],
                options: [{
                    caseSensitive: true
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const aeiou_e = 1,
                        aeioǜ_d = 2,
                        aęiou_b = 3,
                        áeiou_a = 4,
                        æiou_c = 5;
                `,
                errors: [{
                    message: 'Expected variables to be in order. \'aeioǜ_d\' should be before \'aeiou_e\'.',
                    type: 'Identifier'
                }, {
                    message: 'Expected variables to be in order. \'aęiou_b\' should be before \'aeioǜ_d\'.',
                    type: 'Identifier'
                }, {
                    message: 'Expected variables to be in order. \'áeiou_a\' should be before \'aęiou_b\'.',
                    type: 'Identifier'
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const áeiou_a = 1,
                        aęiou_b = 2,
                        æiou_c = 3,
                        aeioǜ_d = 4,
                        aeiou_e = 5;
                `,
                errors: [{
                    message: 'Expected variables to be in order. \'aęiou_b\' should be before \'áeiou_a\'.',
                    type: 'Identifier'
                }, {
                    message: 'Expected variables to be in order. \'aeioǜ_d\' should be before \'æiou_c\'.',
                    type: 'Identifier'
                }, {
                    message: 'Expected variables to be in order. \'aeiou_e\' should be before \'aeioǜ_d\'.',
                    type: 'Identifier'
                }],
                options: [{
                    ignoreSpecialCharacters: false
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const x = 1,
                        y = 2,
                        z = 3,
                        // comments don't count
                        a = 4;
                `,
                errors: [{
                    message: 'Expected variables to be in order. \'a\' should be before \'z\'.',
                    type: 'Identifier'
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const a = 1,


                        b = 2,



                        c = 3;
                `,
                errors: [{
                    message: 'Unexpected empty line between \'a\' and \'b\'.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected empty line between \'b\' and \'c\'.',
                    type: 'Identifier'
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const {
                        c,
                        b,
                        a
                    } = {};
                `,
                errors: [{
                    message: 'Expected properties to be in order. \'b\' should be before \'c\'.',
                    type: 'Identifier'
                }, {
                    message: 'Expected properties to be in order. \'a\' should be before \'b\'.',
                    type: 'Identifier'
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const {
                        a,
                        b,
                        c
                    } = {};
                `,
                errors: [{
                    message: 'Expected properties to be in order. \'b\' should be before \'a\'.',
                    type: 'Identifier'
                }, {
                    message: 'Expected properties to be in order. \'c\' should be before \'b\'.',
                    type: 'Identifier'
                }],
                options: [{
                    direction: 'desc'
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const {
                        a,
                        B,
                        c
                    } = {};
                `,
                errors: [{
                    message: 'Expected properties to be in order. \'B\' should be before \'a\'.',
                    type: 'Identifier'
                }],
                options: [{
                    caseSensitive: true
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const {
                        'aeiou_e': e,
                        'aeioǜ_d': d,
                        'aęiou_b': b,
                        'áeiou_a': a,
                        'æiou_c': c
                    } = {};
                `,
                errors: [{
                    message: 'Expected properties to be in order. \'aeioǜ_d\' should be before \'aeiou_e\'.',
                    type: 'Literal'
                }, {
                    message: 'Expected properties to be in order. \'aęiou_b\' should be before \'aeioǜ_d\'.',
                    type: 'Literal'
                }, {
                    message: 'Expected properties to be in order. \'áeiou_a\' should be before \'aęiou_b\'.',
                    type: 'Literal'
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const {
                        'áeiou_a': a,
                        'aęiou_b': b,
                        'æiou_c': c,
                        'aeioǜ_d': d,
                        'aeiou_e': e
                    } = {};
                `,
                errors: [{
                    message: 'Expected properties to be in order. \'aęiou_b\' should be before \'áeiou_a\'.',
                    type: 'Literal'
                }, {
                    message: 'Expected properties to be in order. \'aeioǜ_d\' should be before \'æiou_c\'.',
                    type: 'Literal'
                }, {
                    message: 'Expected properties to be in order. \'aeiou_e\' should be before \'aeioǜ_d\'.',
                    type: 'Literal'
                }],
                options: [{
                    ignoreSpecialCharacters: false
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const {
                        x,
                        y,
                        z,
                        // comments don't count
                        a
                    } = {};
                `,
                errors: [{
                    message: 'Expected properties to be in order. \'a\' should be before \'z\'.',
                    type: 'Identifier'
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const {
                        a,

                        b,


                        c
                    } = {};
                `,
                errors: [{
                    message: 'Unexpected empty line between \'a\' and \'b\'.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected empty line between \'b\' and \'c\'.',
                    type: 'Identifier'
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }],
            valid = [{
                code: `
                    const a = 1,
                        b = 2,
                        c = 3;
                `,
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const c = 1,
                        b = 2,
                        a = 3;
                `,
                options: [{
                    direction: 'desc'
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const B = 1,
                        a = 2,
                        c = 3;
                `,
                options: [{
                    caseSensitive: true
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const áeiou_a = 1,
                        aęiou_b = 2,
                        æiou_c = 3,
                        aeioǜ_d = 4,
                        aeiou_e = 5;
                `,
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const aeiou_e = 1,
                        aeioǜ_d = 2,
                        aęiou_b = 3,
                        áeiou_a = 4,
                        æiou_c = 5;
                `,
                options: [{
                    ignoreSpecialCharacters: false
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const x = 1,
                        y = 2,
                        z = 3,
                        [
                            a,
                            b,
                            c
                        ] = [
                            4,
                            5,
                            6
                        ];
                `,
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const a = 1,
                        b = 2,
                        // comments are okay
                        c = 3;
                `,
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const a = 1,
                        b = [
                            'multi',
                            'line',
                            'values',
                            'are',
                            'okay'
                        ],
                        c = 3;
                `,
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const a = 1,


                        b = 2,



                        c = 3;
                `,
                options: [{
                    strictEmptyLines: false
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const x = 1,
                        y = 2,
                        z = 3,

                        a = 4;
                `,
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const x = 1,
                        y = 2,
                        z = 3,


                        a = 4;
                `,
                options: [{
                    strictEmptyLines: false
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const {
                        a,
                        b,
                        c
                    } = {};
                `,
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const {
                        c,
                        b,
                        a
                    } = {};
                `,
                options: [{
                    direction: 'desc'
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const {
                        B,
                        a,
                        c
                    } = {};
                `,
                options: [{
                    caseSensitive: true
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const {
                        'áeiou_a': a,
                        'aęiou_b': b,
                        'æiou_c': c,
                        'aeioǜ_d': d,
                        'aeiou_e': e
                    } = {};
                `,
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const {
                        'aeiou_e': e,
                        'aeioǜ_d': d,
                        'aęiou_b': b,
                        'áeiou_a': a,
                        'æiou_c': c
                    } = {};
                `,
                options: [{
                    ignoreSpecialCharacters: false
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const {
                        a,
                        b,
                        [a + b]: ab,
                        c
                    } = {};
                `,
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const {
                        a,
                        b,
                        [\`\${a}\`]: aa,
                        [\`c\`]: c
                    } = {};
                `,
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const {
                        a,


                        b,



                        c
                    } = {};
                `,
                options: [{
                    strictEmptyLines: false
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const {
                        x,
                        y,
                        z,

                        a
                    } = {};
                `,
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const {
                        x,
                        y,
                        z,


                        a
                    } = {};
                `,
                options: [{
                    strictEmptyLines: false
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const a = 1,
                        b = () => {
                            // empty lines in functions are okay

                            return 2;
                        },
                        c = 3;
                `,
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const a = 1,
                        [
                            b
                        ] = () => {
                            // empty lines in functions are okay

                            return 2;
                        },
                        c = 3;
                `,
                parserOptions: {
                    ecmaVersion: 2020
                }
            }];

        invalid.push(...invalid.map(test => ({
            ...test,
            code: test.code.replace('const', 'let')
        })), ...invalid.map(test => ({
            ...test,
            code: test.code.replace('const', 'var')
        })));
        valid.push(...valid.map(test => ({
            ...test,
            code: test.code.replace('const', 'let')
        })), ...valid.map(test => ({
            ...test,
            code: test.code.replace('const', 'var')
        })));

        new _eslint.RuleTester().run('sort-vars', _sortVars, {
            invalid,
            valid
        });
    });
});
