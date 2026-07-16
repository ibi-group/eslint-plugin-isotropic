import _chai from 'isotropic-dev-dependencies/lib/chai.js';
import _eslint from 'eslint';
import _sortVars from '../lib/sort-vars.js';
import _test from 'node:test';

_test.describe('sort-vars', () => {
    _test.it('should be a rule object', () => {
        _chai.expect(_sortVars).to.be.an('object');
        _chai.expect(_sortVars).to.have.property('create').that.is.a('function');
        _chai.expect(_sortVars).to.have.property('meta').that.is.an('object');
    });

    _test.it('should pass eslint tests', () => {
        const invalid = [{
                code: `
                    const c = 3,
                        b = 2,
                        a = 1;
                `,
                errors: [{
                    message: 'Expected variables to be in order. \'b\' should be before \'c\'.'
                }, {
                    message: 'Expected variables to be in order. \'a\' should be before \'b\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const a = 3,
                        b = 2,
                        c = 1;
                `,
                errors: [{
                    message: 'Expected variables to be in order. \'b\' should be before \'a\'.'
                }, {
                    message: 'Expected variables to be in order. \'c\' should be before \'b\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    direction: 'desc'
                }]
            }, {
                code: `
                    const a = 2,
                        B = 1,
                        c = 3;
                `,
                errors: [{
                    message: 'Expected variables to be in order. \'B\' should be before \'a\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    caseSensitive: true
                }]
            }, {
                code: `
                    const aeiou_e = 1,
                        aeioǜ_d = 2,
                        aęiou_b = 3,
                        áeiou_a = 4,
                        æiou_c = 5;
                `,
                errors: [{
                    message: 'Expected variables to be in order. \'aeioǜ_d\' should be before \'aeiou_e\'.'
                }, {
                    message: 'Expected variables to be in order. \'aęiou_b\' should be before \'aeioǜ_d\'.'
                }, {
                    message: 'Expected variables to be in order. \'áeiou_a\' should be before \'aęiou_b\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
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
                    message: 'Expected variables to be in order. \'aęiou_b\' should be before \'áeiou_a\'.'
                }, {
                    message: 'Expected variables to be in order. \'aeioǜ_d\' should be before \'æiou_c\'.'
                }, {
                    message: 'Expected variables to be in order. \'aeiou_e\' should be before \'aeioǜ_d\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    ignoreSpecialCharacters: false
                }]
            }, {
                code: `
                    const x = 1,
                        y = 2,
                        z = 3,
                        // comments don't count
                        a = 4;
                `,
                errors: [{
                    message: 'Expected variables to be in order. \'a\' should be before \'z\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const a = 1,


                        b = 2,



                        c = 3;
                `,
                errors: [{
                    message: 'Unexpected empty line between \'a\' and \'b\'.'
                }, {
                    message: 'Unexpected empty line between \'b\' and \'c\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
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
                    message: 'Expected properties to be in order. \'b\' should be before \'c\'.'
                }, {
                    message: 'Expected properties to be in order. \'a\' should be before \'b\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
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
                    message: 'Expected properties to be in order. \'b\' should be before \'a\'.'
                }, {
                    message: 'Expected properties to be in order. \'c\' should be before \'b\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    direction: 'desc'
                }]
            }, {
                code: `
                    const {
                        a,
                        B,
                        c
                    } = {};
                `,
                errors: [{
                    message: 'Expected properties to be in order. \'B\' should be before \'a\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    caseSensitive: true
                }]
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
                    message: 'Expected properties to be in order. \'aeioǜ_d\' should be before \'aeiou_e\'.'
                }, {
                    message: 'Expected properties to be in order. \'aęiou_b\' should be before \'aeioǜ_d\'.'
                }, {
                    message: 'Expected properties to be in order. \'áeiou_a\' should be before \'aęiou_b\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
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
                    message: 'Expected properties to be in order. \'aęiou_b\' should be before \'áeiou_a\'.'
                }, {
                    message: 'Expected properties to be in order. \'aeioǜ_d\' should be before \'æiou_c\'.'
                }, {
                    message: 'Expected properties to be in order. \'aeiou_e\' should be before \'aeioǜ_d\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    ignoreSpecialCharacters: false
                }]
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
                    message: 'Expected properties to be in order. \'a\' should be before \'z\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
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
                    message: 'Unexpected empty line between \'a\' and \'b\'.'
                }, {
                    message: 'Unexpected empty line between \'b\' and \'c\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }],
            valid = [{
                code: `
                    const a = 1,
                        b = 2,
                        c = 3;
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const c = 1,
                        b = 2,
                        a = 3;
                `,
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    direction: 'desc'
                }]
            }, {
                code: `
                    const B = 1,
                        a = 2,
                        c = 3;
                `,
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    caseSensitive: true
                }]
            }, {
                code: `
                    const áeiou_a = 1,
                        aęiou_b = 2,
                        æiou_c = 3,
                        aeioǜ_d = 4,
                        aeiou_e = 5;
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const aeiou_e = 1,
                        aeioǜ_d = 2,
                        aęiou_b = 3,
                        áeiou_a = 4,
                        æiou_c = 5;
                `,
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    ignoreSpecialCharacters: false
                }]
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
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const a = 1,
                        b = 2,
                        // comments are okay
                        c = 3;
                `,
                languageOptions: {
                    ecmaVersion: 2026
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
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const a = 1,


                        b = 2,



                        c = 3;
                `,
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    strictEmptyLines: false
                }]
            }, {
                code: `
                    const x = 1,
                        y = 2,
                        z = 3,

                        a = 4;
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const x = 1,
                        y = 2,
                        z = 3,


                        a = 4;
                `,
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    strictEmptyLines: false
                }]
            }, {
                code: `
                    const {
                        a,
                        b,
                        c
                    } = {};
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const {
                        c,
                        b,
                        a
                    } = {};
                `,
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    direction: 'desc'
                }]
            }, {
                code: `
                    const {
                        B,
                        a,
                        c
                    } = {};
                `,
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    caseSensitive: true
                }]
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
                languageOptions: {
                    ecmaVersion: 2026
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
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    ignoreSpecialCharacters: false
                }]
            }, {
                code: `
                    const {
                        a,
                        b,
                        [a + b]: ab,
                        c
                    } = {};
                `,
                languageOptions: {
                    ecmaVersion: 2026
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
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const {
                        a,


                        b,



                        c
                    } = {};
                `,
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    strictEmptyLines: false
                }]
            }, {
                code: `
                    const {
                        x,
                        y,
                        z,

                        a
                    } = {};
                `,
                languageOptions: {
                    ecmaVersion: 2026
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
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    strictEmptyLines: false
                }]
            }, {
                code: `
                    const a = 1,
                        b = () => {
                            // empty lines in functions are okay

                            return 2;
                        },
                        c = 3;
                `,
                languageOptions: {
                    ecmaVersion: 2026
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
                languageOptions: {
                    ecmaVersion: 2026
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
