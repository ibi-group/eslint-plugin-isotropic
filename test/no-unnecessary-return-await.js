import _chai from 'isotropic-dev-dependencies/lib/chai.js';
import _eslint from 'eslint';
import _noUnnecessaryReturnAwait from '../lib/no-unnecessary-return-await.js';
import _test from 'node:test';

_test.describe('no-unnecessary-return-await', () => {
    _test.it('should be a rule object', () => {
        _chai.expect(_noUnnecessaryReturnAwait).to.be.an('object');
        _chai.expect(_noUnnecessaryReturnAwait).to.have.property('create').that.is.a('function');
        _chai.expect(_noUnnecessaryReturnAwait).to.have.property('meta').that.is.an('object');
    });

    _test.it('should pass eslint tests', () => {
        new _eslint.RuleTester().run('no-unnecessary-return-await', _noUnnecessaryReturnAwait, {
            invalid: [{
                code: `
                    const f = async () => {
                        return await getValue();
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryReturnAwait'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                output: `
                    const f = async () => {
                        return getValue();
                    };
                `
            }, {
                code: `
                    const f = async () => await getValue();
                `,
                errors: [{
                    messageId: 'unnecessaryReturnAwait'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                output: `
                    const f = async () => getValue();
                `
            }, {
                code: `
                    const f = async () => {
                        try {
                            doStuff();
                        } catch (error) {
                            return await getValue();
                        }
                    };
                `,
                errors: [{
                    messageId: 'unnecessaryReturnAwait'
                }],
                languageOptions: {
                    ecmaVersion: 2026
                },
                output: `
                    const f = async () => {
                        try {
                            doStuff();
                        } catch (error) {
                            return getValue();
                        }
                    };
                `
            }],
            valid: [{
                code: `
                    const f = async () => {
                        try {
                            return await getValue();
                        } catch (error) {
                            handleError(error);
                        }
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const f = async () => {
                        try {
                            doStuff();
                        } catch (error) {
                            return await getValue();
                        } finally {
                            cleanUp();
                        }
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const f = async () => {
                        return getValue();
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const f = async () => {
                        const value = await getValue();

                        return value;
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }, {
                code: `
                    const f = async () => {
                        await getValue();
                    };
                `,
                languageOptions: {
                    ecmaVersion: 2026
                }
            }]
        });
    });
});
