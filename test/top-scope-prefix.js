import _chai from 'isotropic-dev-dependencies/lib/chai.js';
import _eslint from 'eslint';
import _test from 'node:test';
import _topScopePrefix from '../lib/top-scope-prefix.js';

_test.describe('top-scope-prefix', () => {
    _test.it('should be a rule object', () => {
        _chai.expect(_topScopePrefix).to.be.an('object');
        _chai.expect(_topScopePrefix).to.have.property('create').that.is.a('function');
        _chai.expect(_topScopePrefix).to.have.property('meta').that.is.an('object');
    });

    _test.it('should pass eslint tests', () => {
        new _eslint.RuleTester().run('top-scope-prefix', _topScopePrefix, {
            invalid: [{
                code: `
                    const constVariable = null;
                    const {
                        destructureProperty,
                        _renameDestructureProperty: renameDestructureProperty
                    } = {};
                    function functionVariable () {};
                    import importVariable from 'module';
                    let letVariable;
                    import {
                        _renameImportVariable as renameImportVariable
                    } from 'module';
                    var varVariable;
                `,
                errors: [{
                    message: 'Expected top scope variable `constVariable` to have prefix `_`.'
                }, {
                    message: 'Expected top scope variable `destructureProperty` to have prefix `_`.'
                }, {
                    message: 'Expected top scope variable `renameDestructureProperty` to have prefix `_`.'
                }, {
                    message: 'Expected top scope variable `functionVariable` to have prefix `_`.'
                }, {
                    message: 'Expected top scope variable `importVariable` to have prefix `_`.'
                }, {
                    message: 'Expected top scope variable `letVariable` to have prefix `_`.'
                }, {
                    message: 'Expected top scope variable `renameImportVariable` to have prefix `_`.'
                }, {
                    message: 'Expected top scope variable `varVariable` to have prefix `_`.'
                }],
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }, {
                code: `
                    const constVariable = null;
                    const {
                        destructureProperty,
                        _renameDestructureProperty: renameDestructureProperty
                    } = {};
                    function functionVariable () {};
                    let letVariable;
                    var varVariable;
                `,
                errors: [{
                    message: 'Expected top scope variable `constVariable` to have prefix `_`.'
                }, {
                    message: 'Expected top scope variable `destructureProperty` to have prefix `_`.'
                }, {
                    message: 'Expected top scope variable `renameDestructureProperty` to have prefix `_`.'
                }, {
                    message: 'Expected top scope variable `functionVariable` to have prefix `_`.'
                }, {
                    message: 'Expected top scope variable `letVariable` to have prefix `_`.'
                }, {
                    message: 'Expected top scope variable `varVariable` to have prefix `_`.'
                }],
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'script'
                }
            }, {
                code: `
                    const constVariable = null;
                    const {
                        destructureProperty,
                        _renameDestructureProperty: renameDestructureProperty
                    } = {};
                    function functionVariable () {};
                    let letVariable;
                    var varVariable;
                `,
                errors: [{
                    message: 'Expected top scope variable `constVariable` to have prefix `_`.'
                }, {
                    message: 'Expected top scope variable `destructureProperty` to have prefix `_`.'
                }, {
                    message: 'Expected top scope variable `renameDestructureProperty` to have prefix `_`.'
                }, {
                    message: 'Expected top scope variable `functionVariable` to have prefix `_`.'
                }, {
                    message: 'Expected top scope variable `letVariable` to have prefix `_`.'
                }, {
                    message: 'Expected top scope variable `varVariable` to have prefix `_`.'
                }],
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'commonjs'
                }
            }, {
                code: `
                    {
                        const _constVariable = null;
                        const {
                            _destructureProperty,
                            renameDestructureProperty: _renameDestructureProperty
                        } = {};
                        function _functionVariable (_functionArgument) {};
                        let _letVariable;
                        var varVariable;
                    }
                `,
                errors: [{
                    message: 'Unexpected prefix `_` on child scope variable `_constVariable`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_destructureProperty`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_renameDestructureProperty`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_functionVariable`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_functionArgument`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_letVariable`.'
                }, {
                    message: 'Expected top scope variable `varVariable` to have prefix `_`.'
                }],
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'script'
                }
            }, {
                code: `
                    {
                        const _constVariable = null;
                        const {
                            _destructureProperty,
                            renameDestructureProperty: _renameDestructureProperty
                        } = {};
                        function _functionVariable (_functionArgument) {};
                        let _letVariable;
                        var varVariable;
                    }
                `,
                errors: [{
                    message: 'Unexpected prefix `_` on child scope variable `_constVariable`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_destructureProperty`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_renameDestructureProperty`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_functionVariable`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_functionArgument`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_letVariable`.'
                }, {
                    message: 'Expected top scope variable `varVariable` to have prefix `_`.'
                }],
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'commonjs'
                }
            }, {
                code: `
                    (() => {
                        const _constVariable = null;
                        const {
                            _destructureProperty,
                            renameDestructureProperty: _renameDestructureProperty
                        } = {};
                        function _functionVariable (_functionArgument) {};
                        let _letVariable;
                        var _varVariable;
                    })();
                `,
                errors: [{
                    message: 'Unexpected prefix `_` on child scope variable `_constVariable`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_destructureProperty`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_renameDestructureProperty`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_functionVariable`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_functionArgument`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_letVariable`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_varVariable`.'
                }],
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'script'
                }
            }, {
                code: `
                    (() => {
                        const _constVariable = null;
                        const {
                            _destructureProperty,
                            renameDestructureProperty: _renameDestructureProperty
                        } = {};
                        function _functionVariable (_functionArgument) {};
                        let _letVariable;
                        var _varVariable;
                    })();
                `,
                errors: [{
                    message: 'Unexpected prefix `_` on child scope variable `_constVariable`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_destructureProperty`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_renameDestructureProperty`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_functionVariable`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_functionArgument`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_letVariable`.'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_varVariable`.'
                }],
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'commonjs'
                }
            }, {
                code: `
                    const constVariable = null;
                    const {
                        destructureProperty,
                        PREFIXRenameDestructureProperty: renameDestructureProperty
                    } = {};
                    function functionVariable (PREFIXFunctionArgument) {
                        const PREFIXFunctionConstVariable = null;
                        const {
                            PREFIXFunctionDestructureProperty,
                            functionRenameDestructureProperty: PREFIXFunctionRenameDestructureProperty
                        } = {};
                        function PREFIXFunctionFunctionVariable (PREFIXFunctionFunctionArgument) {};
                        let PREFIXFunctionLetVariable;
                        var PREFIXFunctionVarVariable;
                    };
                    import importVariable from 'module';
                    let letVariable;
                    import {
                        PREFIXRenameImportVariable as renameImportVariable
                    } from 'module';
                    var varVariable;
                `,
                errors: [{
                    message: 'Expected top scope variable `constVariable` to have prefix `PREFIX`.'
                }, {
                    message: 'Expected top scope variable `destructureProperty` to have prefix `PREFIX`.'
                }, {
                    message: 'Expected top scope variable `renameDestructureProperty` to have prefix `PREFIX`.'
                }, {
                    message: 'Expected top scope variable `functionVariable` to have prefix `PREFIX`.'
                }, {
                    message: 'Unexpected prefix `PREFIX` on child scope variable `PREFIXFunctionArgument`.'
                }, {
                    message: 'Unexpected prefix `PREFIX` on child scope variable `PREFIXFunctionConstVariable`.'
                }, {
                    message: 'Unexpected prefix `PREFIX` on child scope variable `PREFIXFunctionDestructureProperty`.'
                }, {
                    message: 'Unexpected prefix `PREFIX` on child scope variable `PREFIXFunctionRenameDestructureProperty`.'
                }, {
                    message: 'Unexpected prefix `PREFIX` on child scope variable `PREFIXFunctionFunctionVariable`.'
                }, {
                    message: 'Unexpected prefix `PREFIX` on child scope variable `PREFIXFunctionFunctionArgument`.'
                }, {
                    message: 'Unexpected prefix `PREFIX` on child scope variable `PREFIXFunctionLetVariable`.'
                }, {
                    message: 'Unexpected prefix `PREFIX` on child scope variable `PREFIXFunctionVarVariable`.'
                }, {
                    message: 'Expected top scope variable `importVariable` to have prefix `PREFIX`.'
                }, {
                    message: 'Expected top scope variable `letVariable` to have prefix `PREFIX`.'
                }, {
                    message: 'Expected top scope variable `renameImportVariable` to have prefix `PREFIX`.'
                }, {
                    message: 'Expected top scope variable `varVariable` to have prefix `PREFIX`.'
                }],
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                },
                options: [{
                    prefix: 'PREFIX'
                }]
            }],
            valid: [{
                code: `
                    const _constVariable = null;
                    const {
                        _destructureProperty,
                        renameDestructureProperty: _renameDestructureProperty
                    } = {};
                    function _functionVariable () {};
                    import _importVariable from 'module';
                    let _letVariable;
                    import {
                        renameImportVariable as _renameImportVariable
                    } from 'module';
                    var _varVariable;
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                }
            }, {
                code: `
                    const _constVariable = null;
                    const {
                        _destructureProperty,
                        renameDestructureProperty: _renameDestructureProperty
                    } = {};
                    function _functionVariable () {};
                    let _letVariable;
                    var _varVariable;
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'script'
                }
            }, {
                code: `
                    const _constVariable = null;
                    const {
                        _destructureProperty,
                        renameDestructureProperty: _renameDestructureProperty
                    } = {};
                    function _functionVariable () {};
                    let _letVariable;
                    var _varVariable;
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'commonjs'
                }
            }, {
                code: `
                    {
                        const constVariable = null;
                        const {
                            destructureProperty,
                            _renameDestructureProperty: renameDestructureProperty
                        } = {};
                        function functionVariable (functionArgument) {};
                        let letVariable;
                        var _varVariable;
                    }
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'script'
                }
            }, {
                code: `
                    {
                        const constVariable = null;
                        const {
                            destructureProperty,
                            _renameDestructureProperty: renameDestructureProperty
                        } = {};
                        function functionVariable (functionArgument) {};
                        let letVariable;
                        var _varVariable;
                    }
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'commonjs'
                }
            }, {
                code: `
                    (() => {
                        const constVariable = null;
                        const {
                            destructureProperty,
                            _renameDestructureProperty: renameDestructureProperty
                        } = {};
                        function functionVariable (functionArgument) {};
                        let letVariable;
                        var varVariable;
                    })();
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'script'
                }
            }, {
                code: `
                    (() => {
                        const constVariable = null;
                        const {
                            destructureProperty,
                            _renameDestructureProperty: renameDestructureProperty
                        } = {};
                        function functionVariable (functionArgument) {};
                        let letVariable;
                        var varVariable;
                    })();
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'commonjs'
                }
            }, {
                code: `
                    const PREFIXConstVariable = null;
                    const {
                        PREFIXDestructureProperty,
                        renameDestructureProperty: PREFIXRenameDestructureProperty
                    } = {};
                    function PREFIXFunctionVariable (functionArgument) {
                        const functionConstVariable = null;
                        const {
                            functionDestructureProperty,
                            PREFIXFunctionRenameDestructureProperty: functionRenameDestructureProperty
                        } = {};
                        function functionFunctionVariable (functionFunctionArgument) {};
                        let functionLetVariable;
                        var functionVarVariable;
                    };
                    import PREFIXImportVariable from 'module';
                    let PREFIXLetVariable;
                    import {
                        renameImportVariable as PREFIXRenameImportVariable
                    } from 'module';
                    var PREFIXVarVariable;
                `,
                languageOptions: {
                    ecmaVersion: 2026,
                    sourceType: 'module'
                },
                options: [{
                    prefix: 'PREFIX'
                }]
            }]
        });
    });
});
