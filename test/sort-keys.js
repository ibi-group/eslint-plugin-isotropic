import _chai from 'isotropic-dev-dependencies/lib/chai.js';
import _eslint from 'eslint';
import _mocha from 'isotropic-dev-dependencies/lib/mocha.js';
import _sortKeys from '../js/sort-keys.js';

_mocha.describe('sortKeys', () => {
    _mocha.it('should be a rule object', () => {
        _chai.expect(_sortKeys).to.be.an('object');
        _chai.expect(_sortKeys).to.have.property('create').that.is.a('function');
        _chai.expect(_sortKeys).to.have.property('meta').that.is.an('object');
    });

    _mocha.it('should pass eslint tests', () => {
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
                    message: 'Expected object keys to be in order. \'b\' should be before \'c\'.',
                    type: 'Identifier'
                }, {
                    message: 'Expected object keys to be in order. \'a\' should be before \'b\'.',
                    type: 'Identifier'
                }],
                parserOptions: {
                    ecmaVersion: 2020
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
                    message: 'Expected object keys to be in order. \'x\' should be before \'_c\'.',
                    type: 'Identifier'
                }],
                parserOptions: {
                    ecmaVersion: 2020
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
                    message: 'Expected object keys to be in order. \'b\' should be before \'a\'.',
                    type: 'Identifier'
                }, {
                    message: 'Expected object keys to be in order. \'c\' should be before \'b\'.',
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
                    const object = {
                        a: 2,
                        B: 1,
                        c: 3
                    };
                `,
                errors: [{
                    message: 'Expected object keys to be in order. \'B\' should be before \'a\'.',
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
                    const object = {
                        'aeiou_e': 1,
                        'aeioǜ_d': 2,
                        'aęiou_b': 3,
                        'áeiou_a': 4,
                        'æiou_c': 5
                    };
                `,
                errors: [{
                    message: 'Expected object keys to be in order. \'aeioǜ_d\' should be before \'aeiou_e\'.',
                    type: 'Literal'
                }, {
                    message: 'Expected object keys to be in order. \'aęiou_b\' should be before \'aeioǜ_d\'.',
                    type: 'Literal'
                }, {
                    message: 'Expected object keys to be in order. \'áeiou_a\' should be before \'aęiou_b\'.',
                    type: 'Literal'
                }],
                parserOptions: {
                    ecmaVersion: 2020
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
                    message: 'Expected object keys to be in order. \'aęiou_b\' should be before \'áeiou_a\'.',
                    type: 'Literal'
                }, {
                    message: 'Expected object keys to be in order. \'aeioǜ_d\' should be before \'æiou_c\'.',
                    type: 'Literal'
                }, {
                    message: 'Expected object keys to be in order. \'aeiou_e\' should be before \'aeioǜ_d\'.',
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
                    const object = {
                        c: 4,
                        [a + b]: 3,
                        b: 2,
                        a: 1
                    };
                `,
                errors: [{
                    message: 'Expected object keys to be in order. \'b\' should be before \'c\'.',
                    type: 'Identifier'
                }, {
                    message: 'Expected object keys to be in order. \'a\' should be before \'b\'.',
                    type: 'Identifier'
                }],
                parserOptions: {
                    ecmaVersion: 2020
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
                    message: 'Expected object keys to be in order. \'b\' should be before \'c\'.',
                    type: 'Identifier'
                }, {
                    message: 'Expected object keys to be in order. \'a\' should be before \'b\'.',
                    type: 'Identifier'
                }],
                parserOptions: {
                    ecmaVersion: 2020
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
                    message: 'Expected object keys to be in order. \'b\' should be before \'c\'.',
                    type: 'Identifier'
                }, {
                    message: 'Expected object keys to be in order. \'a\' should be before \'b\'.',
                    type: 'Identifier'
                }],
                parserOptions: {
                    ecmaVersion: 2020
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
                parserOptions: {
                    ecmaVersion: 2020
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
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const object = {
                        c: 1,
                        b: 2,
                        a: 3
                    };
                `,
                options: [{
                    direction: 'desc'
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const object = {
                        B: 1,
                        a: 2,
                        c: 3
                    };
                `,
                options: [{
                    caseSensitive: true
                }],
                parserOptions: {
                    ecmaVersion: 2020
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
                parserOptions: {
                    ecmaVersion: 2020
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
                options: [{
                    ignoreSpecialCharacters: false
                }],
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const object = {
                        a: 1,
                        b: 2,
                        [a + b]: 3,
                        c: 4
                    };
                `,
                parserOptions: {
                    ecmaVersion: 2020
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
                parserOptions: {
                    ecmaVersion: 2020
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
                parserOptions: {
                    ecmaVersion: 2020
                }
            }, {
                code: `
                    const {
                        a,
                        b
                    } = {};
                `,
                parserOptions: {
                    ecmaVersion: 2020
                }
            }]
        });
    });
});
