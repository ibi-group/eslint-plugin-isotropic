import _chai from 'isotropic-dev-dependencies/lib/chai.js';
import _eslint from 'eslint';
import _sortKeys from '../lib/sort-keys.js';
import _test from 'node:test';

_test.describe('sort-keys', () => {
    _test.it('should be a rule object', () => {
        _chai.expect(_sortKeys).to.be.an('object');
        _chai.expect(_sortKeys).to.have.property('create').that.is.a('function');
        _chai.expect(_sortKeys).to.have.property('meta').that.is.an('object');
    });

    _test.it('should pass eslint tests', () => {
        new _eslint.RuleTester().run('sort-keys', _sortKeys, {
            invalid: [{
                code: `
                    const object = {
                        c: 3,
                        b: 2,
                        a: 1
                    };
                `,
                errors: [{
                    message: 'Expected object keys to be in order. \'b\' should be before \'c\'.'
                }, {
                    message: 'Expected object keys to be in order. \'a\' should be before \'b\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const object = {
                        _a: 1,
                        _b: 2,
                        _c: 3,
                        x: 4,
                        y: 5,
                        z: 6
                    };
                `,
                errors: [{
                    message: 'Expected object keys to be in order. \'x\' should be before \'_c\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const object = {
                        a: 3,
                        b: 2,
                        c: 1
                    };
                `,
                errors: [{
                    message: 'Expected object keys to be in order. \'b\' should be before \'a\'.'
                }, {
                    message: 'Expected object keys to be in order. \'c\' should be before \'b\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    direction: 'desc'
                }]
            }, {
                code: `
                    const object = {
                        a: 2,
                        B: 1,
                        c: 3
                    };
                `,
                errors: [{
                    message: 'Expected object keys to be in order. \'B\' should be before \'a\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    caseSensitive: true
                }]
            }, {
                code: `
                    const object = {
                        'aeiou_e': 1,
                        'aeioǜ_d': 2,
                        'aęiou_b': 3,
                        'áeiou_a': 4,
                        'æiou_c': 5
                    };
                `,
                errors: [{
                    message: 'Expected object keys to be in order. \'aeioǜ_d\' should be before \'aeiou_e\'.'
                }, {
                    message: 'Expected object keys to be in order. \'aęiou_b\' should be before \'aeioǜ_d\'.'
                }, {
                    message: 'Expected object keys to be in order. \'áeiou_a\' should be before \'aęiou_b\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const object = {
                        'áeiou_a': 1,
                        'aęiou_b': 2,
                        'æiou_c': 3,
                        'aeioǜ_d': 4,
                        'aeiou_e': 5
                    };
                `,
                errors: [{
                    message: 'Expected object keys to be in order. \'aęiou_b\' should be before \'áeiou_a\'.'
                }, {
                    message: 'Expected object keys to be in order. \'aeioǜ_d\' should be before \'æiou_c\'.'
                }, {
                    message: 'Expected object keys to be in order. \'aeiou_e\' should be before \'aeioǜ_d\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    ignoreSpecialCharacters: false
                }]
            }, {
                code: `
                    const object = {
                        c: 4,
                        [a + b]: 3,
                        b: 2,
                        a: 1
                    };
                `,
                errors: [{
                    message: 'Expected object keys to be in order. \'b\' should be before \'c\'.'
                }, {
                    message: 'Expected object keys to be in order. \'a\' should be before \'b\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const object = {
                        c: 4,
                        ...abc,
                        b: 2,
                        a: 1
                    };
                `,
                errors: [{
                    message: 'Expected object keys to be in order. \'b\' should be before \'c\'.'
                }, {
                    message: 'Expected object keys to be in order. \'a\' should be before \'b\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const object = {
                        c: 3,
                        [b]: 2,
                        a: 1
                    };
                `,
                errors: [{
                    message: 'Expected object keys to be in order. \'b\' should be before \'c\'.'
                }, {
                    message: 'Expected object keys to be in order. \'a\' should be before \'b\'.'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                }
            }],
            valid: [{
                code: `
                    const object = {
                        a: 1,
                        b: 2,
                        c: 3
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const object = {
                        x: 1,
                        y: 2,
                        z: 3,
                        _a: 4,
                        _b: 5,
                        _c: 6
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const object = {
                        c: 1,
                        b: 2,
                        a: 3
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    direction: 'desc'
                }]
            }, {
                code: `
                    const object = {
                        B: 1,
                        a: 2,
                        c: 3
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    caseSensitive: true
                }]
            }, {
                code: `
                    const object = {
                        'áeiou_a': 1,
                        'aęiou_b': 2,
                        'æiou_c': 3,
                        'aeioǜ_d': 4,
                        'aeiou_e': 5
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const object = {
                        'aeiou_e': 1,
                        'aeioǜ_d': 2,
                        'aęiou_b': 3,
                        'áeiou_a': 4,
                        'æiou_c': 5
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                },
                options: [{
                    ignoreSpecialCharacters: false
                }]
            }, {
                code: `
                    const object = {
                        a: 1,
                        b: 2,
                        [a + b]: 3,
                        c: 4
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const object = {
                        a: 1,
                        b: 2,
                        [\`\${a}\`]: 3,
                        [\`c\`]: 4
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const object = {
                        a: 1,
                        b: 2,
                        ...abc,
                        c: 4
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const {
                        a,
                        b
                    } = {};
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }]
        });
    });
});
