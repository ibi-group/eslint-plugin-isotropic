import _chai from 'chai';
import _eslint from 'eslint';
import _mocha from 'mocha';
import _topScopePrefix from '../js/top-scope-prefix.js';

_mocha.describe('topScopePrefix', () => {
    _mocha.it('should be a rule object', () => {
        _chai.expect(_topScopePrefix).to.be.an('object');
        _chai.expect(_topScopePrefix).to.have.property('create').that.is.a('function');
        _chai.expect(_topScopePrefix).to.have.property('meta').that.is.an('object');
    });

    _mocha.it('should pass eslint tests', () => {
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
                    message: 'Expected top scope variable `constVariable` to have prefix `_`.',
                    type: 'Identifier'
                }, {
                    message: 'Expected top scope variable `destructureProperty` to have prefix `_`.',
                    type: 'Identifier'
                }, {
                    message: 'Expected top scope variable `renameDestructureProperty` to have prefix `_`.',
                    type: 'Identifier'
                }, {
                    message: 'Expected top scope variable `functionVariable` to have prefix `_`.',
                    type: 'Identifier'
                }, {
                    message: 'Expected top scope variable `importVariable` to have prefix `_`.',
                    type: 'Identifier'
                }, {
                    message: 'Expected top scope variable `letVariable` to have prefix `_`.',
                    type: 'Identifier'
                }, {
                    message: 'Expected top scope variable `renameImportVariable` to have prefix `_`.',
                    type: 'Identifier'
                }, {
                    message: 'Expected top scope variable `varVariable` to have prefix `_`.',
                    type: 'Identifier'
                }],
                parserOptions: {
                    ecmaVersion: 2020,
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
                    message: 'Expected top scope variable `constVariable` to have prefix `_`.',
                    type: 'Identifier'
                }, {
                    message: 'Expected top scope variable `destructureProperty` to have prefix `_`.',
                    type: 'Identifier'
                }, {
                    message: 'Expected top scope variable `renameDestructureProperty` to have prefix `_`.',
                    type: 'Identifier'
                }, {
                    message: 'Expected top scope variable `functionVariable` to have prefix `_`.',
                    type: 'Identifier'
                }, {
                    message: 'Expected top scope variable `letVariable` to have prefix `_`.',
                    type: 'Identifier'
                }, {
                    message: 'Expected top scope variable `varVariable` to have prefix `_`.',
                    type: 'Identifier'
                }],
                parserOptions: {
                    ecmaVersion: 2020
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
                    message: 'Unexpected prefix `_` on child scope variable `_constVariable`.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_destructureProperty`.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_renameDestructureProperty`.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_functionVariable`.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_functionArgument`.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_letVariable`.',
                    type: 'Identifier'
                }, {
                    message: 'Expected top scope variable `varVariable` to have prefix `_`.',
                    type: 'Identifier'
                }],
                parserOptions: {
                    ecmaVersion: 2020
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
                    message: 'Unexpected prefix `_` on child scope variable `_constVariable`.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_destructureProperty`.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_renameDestructureProperty`.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_functionVariable`.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_functionArgument`.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_letVariable`.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected prefix `_` on child scope variable `_varVariable`.',
                    type: 'Identifier'
                }],
                parserOptions: {
                    ecmaVersion: 2020
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
                    message: 'Expected top scope variable `constVariable` to have prefix `PREFIX`.',
                    type: 'Identifier'
                }, {
                    message: 'Expected top scope variable `destructureProperty` to have prefix `PREFIX`.',
                    type: 'Identifier'
                }, {
                    message: 'Expected top scope variable `renameDestructureProperty` to have prefix `PREFIX`.',
                    type: 'Identifier'
                }, {
                    message: 'Expected top scope variable `functionVariable` to have prefix `PREFIX`.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected prefix `PREFIX` on child scope variable `PREFIXFunctionArgument`.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected prefix `PREFIX` on child scope variable `PREFIXFunctionConstVariable`.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected prefix `PREFIX` on child scope variable `PREFIXFunctionDestructureProperty`.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected prefix `PREFIX` on child scope variable `PREFIXFunctionRenameDestructureProperty`.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected prefix `PREFIX` on child scope variable `PREFIXFunctionFunctionVariable`.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected prefix `PREFIX` on child scope variable `PREFIXFunctionFunctionArgument`.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected prefix `PREFIX` on child scope variable `PREFIXFunctionLetVariable`.',
                    type: 'Identifier'
                }, {
                    message: 'Unexpected prefix `PREFIX` on child scope variable `PREFIXFunctionVarVariable`.',
                    type: 'Identifier'
                }, {
                    message: 'Expected top scope variable `importVariable` to have prefix `PREFIX`.',
                    type: 'Identifier'
                }, {
                    message: 'Expected top scope variable `letVariable` to have prefix `PREFIX`.',
                    type: 'Identifier'
                }, {
                    message: 'Expected top scope variable `renameImportVariable` to have prefix `PREFIX`.',
                    type: 'Identifier'
                }, {
                    message: 'Expected top scope variable `varVariable` to have prefix `PREFIX`.',
                    type: 'Identifier'
                }],
                options: [{
                    prefix: 'PREFIX'
                }],
                parserOptions: {
                    ecmaVersion: 2020,
                    sourceType: 'module'
                }
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
                parserOptions: {
                    ecmaVersion: 2020,
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
                parserOptions: {
                    ecmaVersion: 2020
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
                parserOptions: {
                    ecmaVersion: 2020
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
                parserOptions: {
                    ecmaVersion: 2020
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
                options: [{
                    prefix: 'PREFIX'
                }],
                parserOptions: {
                    ecmaVersion: 2020,
                    sourceType: 'module'
                }
            }]
        });
    });
});
