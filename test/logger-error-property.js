import _chai from 'isotropic-dev-dependencies/lib/chai.js';
import _eslint from 'eslint';
import _loggerErrorProperty from '../lib/logger-error-property.js';
import _test from 'node:test';

_test.describe('logger-error-property', () => {
    _test.it('should be a rule object', () => {
        _chai.expect(_loggerErrorProperty).to.be.an('object');
        _chai.expect(_loggerErrorProperty).to.have.property('create').that.is.a('function');
        _chai.expect(_loggerErrorProperty).to.have.property('meta').that.is.an('object');
    });

    _test.it('should pass eslint tests', () => {
        new _eslint.RuleTester().run('logger-error-property', _loggerErrorProperty, {
            invalid: [{
                code: `
                    import _Error from 'isotropic-error';
                    import _logger from 'isotropic-logger';

                    _logger.error(_Error({
                        message: 'An error occurred'
                    }), 'An error occurred');
                `,
                errors: [{
                    messageId: 'loggerErrorProperty'
                }],
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }, {
                code: `
                    import _Error from 'isotropic-error';
                    import _logger from 'isotropic-logger';

                    _logger.error({
                        err: _Error({
                            message: 'An error occurred'
                        })
                    }, 'An error occurred');
                `,
                errors: [{
                    messageId: 'loggerErrorProperty'
                }],
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }, {
                code: `
                    import _Error from 'isotropic-error';
                    import _logger from 'isotropic-logger';

                    _logger.error({
                        'cause': _Error({
                            message: 'An error occurred'
                        })
                    }, 'An error occurred');
                `,
                errors: [{
                    messageId: 'loggerErrorProperty'
                }],
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }],
            valid: [{
                code: `
                    import _Error from 'isotropic-error';
                    import _logger from 'isotropic-logger';

                    _logger.error({
                        error: _Error({
                            message: 'An error occurred'
                        })
                    }, 'An error occurred');
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }, {
                code: `
                    _logger.error(_Error({
                        message: 'An error occurred'
                    }), 'An error occurred');
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }, {
                code: `
                    import _logger from 'isotropic-logger';

                    _logger.child({
                        component: 'thing'
                    });
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }, {
                code: `
                    import _logger from 'isotropic-logger';

                    other.error(someError);
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }, {
                code: `
                    import _Error from 'isotropic-error';
                    import _logger from 'isotropic-logger';

                    _logger.info({
                        userId: 5
                    }, 'A message');
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }, {
                code: `
                    import _Error from 'isotropic-error';
                    import _logger from 'isotropic-logger';

                    _logger.debug('just a message');
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }, {
                code: `
                    import _Error from 'isotropic-error';
                    import _logger from 'isotropic-logger';

                    _logger.error({
                        'error': _Error({
                            message: 'An error occurred'
                        })
                    }, 'An error occurred');
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }, {
                code: `
                    import _Error from 'isotropic-error';
                    import _logger from 'isotropic-logger';

                    _logger.error({
                        [errorKey]: _Error({
                            message: 'An error occurred'
                        })
                    }, 'An error occurred');
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }, {
                code: `
                    import _Error from 'isotropic-error';
                    import _logger from 'isotropic-logger';

                    _logger.error({
                        ...baseData,
                        error: _Error({
                            message: 'An error occurred'
                        })
                    }, 'An error occurred');
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }, {
                code: `
                    import _logger from 'isotropic-logger';

                    _logger.error(getError(), 'An error occurred');
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }, {
                code: `
                    import _Error from 'isotropic-error';
                    import _logger from 'isotropic-logger';

                    _logger.error(namespace.getError(), 'An error occurred');
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }, {
                code: `
                    import _Error from 'isotropic-error';
                    import _logger from 'isotropic-logger';

                    _logger.error(getError(), 'An error occurred');
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }, {
                code: `
                    import _logger from 'isotropic-logger';

                    _logger['error'](someError);
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }, {
                code: `
                    import _logger from 'isotropic-logger';

                    app.logger.error(someError);
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }, {
                code: `
                    import _Error from 'isotropic-error';
                    import _logger from 'isotropic-logger';

                    _logger.info();
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }, {
                code: `
                    import _other from 'other-module';
                    import _logger from 'isotropic-logger';

                    _logger.info('A message');
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }, {
                code: `
                    import {
                        createLogger
                    } from 'isotropic-logger';

                    createLogger();
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }]
        });
    });
});
