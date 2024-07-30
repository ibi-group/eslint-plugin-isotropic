import * as _eslintPluginImportX from 'eslint-plugin-import-x';
import _eslintPluginEslintComments from '@eslint-community/eslint-plugin-eslint-comments';
import _eslintPluginN from 'eslint-plugin-n';
import _eslintPluginPromise from 'eslint-plugin-promise';
import _eslintPluginRegexp from 'eslint-plugin-regexp';
import _eslintPluginStylistic from '@stylistic/eslint-plugin';
import _filenameMustMatchPattern from './filename-must-match-pattern.js';
import _filenameMustNotMatchPattern from './filename-must-not-match-pattern.js';
import _fs from 'fs-extra';
import _globals from 'globals';
import _preferDateNow from './prefer-date-now.js';
import _preferReflectApply from './prefer-reflect-apply.js';
import _sortKeys from './sort-keys.js';
import _sortVars from './sort-vars.js';
import _topScopePrefix from './top-scope-prefix.js';

const _packageDefinition = _fs.readJsonSync(`${import.meta.dirname}/../package.json`),

    _eslintPluginIsotropic = {
        configs: {
            isotropic: {
                languageOptions: {
                    ecmaVersion: 2025,
                    globals: {
                        ..._globals.nodeBuiltin,
                        __line: 'readonly'
                    },
                    parserOptions: {
                        ecmaFeatures: {
                            globalReturn: false,
                            impliedStrict: true,
                            jsx: false
                        },
                        ecmaVersion: 2025
                    },
                    sourceType: 'module'
                },
                linterOptions: {
                    reportUnusedDisableDirectives: 'error'
                },
                plugins: {},
                rules: {
                    'accessor-pairs': [
                        'warn',
                        {
                            enforceForClassMembers: true,
                            getWithoutSet: false,
                            setWithoutGet: true
                        }
                    ],
                    'array-callback-return': [
                        'error',
                        {
                            allowImplicit: true,
                            allowVoid: false,
                            checkForEach: true
                        }
                    ],
                    'arrow-body-style': [
                        'error',
                        'as-needed',
                        {
                            requireReturnForObjectLiteral: false
                        }
                    ],
                    'block-scoped-var': 'off',
                    camelcase: [
                        'warn',
                        {
                            allow: [],
                            ignoreDestructuring: false,
                            ignoreGlobals: false,
                            ignoreImports: false,
                            properties: 'always'
                        }
                    ],
                    'capitalized-comments': 'off',
                    'class-methods-use-this': 'warn',
                    complexity: 'off',
                    'consistent-return': 'off',
                    'consistent-this': [
                        'warn',
                        'me'
                    ],
                    'constructor-super': 'error',
                    curly: [
                        'error',
                        'all'
                    ],
                    'default-case': 'off',
                    'default-case-last': 'error',
                    'default-param-last': 'warn',
                    'dot-notation': 'error',
                    eqeqeq: [
                        'error',
                        'always'
                    ],
                    'for-direction': 'error',
                    'func-name-matching': [
                        'warn',
                        'always',
                        {
                            considerPropertyDescriptor: true,
                            includeCommonJSModuleExports: false
                        }
                    ],
                    'func-names': [
                        'error',
                        'never',
                        {
                            generators: 'never'
                        }
                    ],
                    'func-style': [
                        'error',
                        'expression'
                    ],
                    'getter-return': [
                        'error',
                        {
                            allowImplicit: false
                        }
                    ],
                    'grouped-accessor-pairs': [
                        'error',
                        'getBeforeSet'
                    ],
                    'guard-for-in': 'warn',
                    'id-denylist': 'off',
                    'id-length': 'off',
                    'id-match': 'off',
                    'init-declarations': 'off',
                    'isotropic/eslint-comments/disable-enable-pair': 'warn',
                    'isotropic/eslint-comments/no-aggregating-enable': 'error',
                    'isotropic/eslint-comments/no-duplicate-disable': 'error',
                    'isotropic/eslint-comments/no-restricted-disable': 'off',
                    'isotropic/eslint-comments/no-unlimited-disable': 'error',
                    'isotropic/eslint-comments/no-unused-disable': 'error',
                    'isotropic/eslint-comments/no-unused-enable': 'error',
                    'isotropic/eslint-comments/no-use': 'warn',
                    'isotropic/eslint-comments/require-description': 'error',
                    'isotropic/filename-must-match-pattern': [
                        'warn',
                        {
                            flags: 'v',
                            pattern: '^[\\da-z](?:[\\d\\-.a-z]*?[\\da-z])?|Configuration(?:\\.[\\da-z](?:[\\d\\-.a-z]*?[\\da-z])?)?$'
                        }
                    ],
                    'isotropic/filename-must-not-match-pattern': [
                        'warn',
                        {
                            flags: 'v',
                            pattern: '^index$'
                        }
                    ],
                    'isotropic/import/consistent-type-specifier-style': 'off',
                    'isotropic/import/default': 'error',
                    'isotropic/import/dynamic-import-chunkname': 'off',
                    'isotropic/import/export': 'error',
                    'isotropic/import/exports-last': 'error',
                    'isotropic/import/extensions': [
                        'error',
                        'ignorePackages'
                    ],
                    'isotropic/import/first': 'error',
                    'isotropic/import/group-exports': 'error',
                    'isotropic/import/max-dependencies': 'off',
                    'isotropic/import/named': 'error',
                    'isotropic/import/namespace': [
                        'error',
                        {
                            allowComputed: true
                        }
                    ],
                    'isotropic/import/newline-after-import': [
                        'error',
                        {
                            count: 1
                        }
                    ],
                    'isotropic/import/no-absolute-path': [
                        'error',
                        {
                            amd: false,
                            commonjs: true,
                            esmodule: true
                        }
                    ],
                    'isotropic/import/no-amd': 'error',
                    'isotropic/import/no-anonymous-default-export': 'off',
                    'isotropic/import/no-commonjs': 'off',
                    'isotropic/import/no-cycle': 'off',
                    'isotropic/import/no-default-export': 'off',
                    'isotropic/import/no-deprecated': 'warn',
                    'isotropic/import/no-duplicates': [
                        'error', {
                            considerQueryString: true
                        }
                    ],
                    'isotropic/import/no-dynamic-require': 'warn',
                    'isotropic/import/no-empty-named-blocks': 'error',
                    'isotropic/import/no-extraneous-dependencies': [
                        'error',
                        {
                            bundledDependencies: true,
                            devDependencies: true,
                            optionalDependencies: true,
                            peerDependencies: true

                        }
                    ],
                    'isotropic/import/no-import-module-exports': 'error',
                    'isotropic/import/no-internal-modules': 'off',
                    'isotropic/import/no-mutable-exports': 'warn',
                    'isotropic/import/no-named-as-default': 'warn',
                    'isotropic/import/no-named-as-default-member': 'warn',
                    'isotropic/import/no-named-default': 'error',
                    'isotropic/import/no-named-export': 'off',
                    'isotropic/import/no-namespace': 'off',
                    'isotropic/import/no-nodejs-modules': 'off',
                    'isotropic/import/no-relative-packages': 'error',
                    'isotropic/import/no-relative-parent-imports': 'off',
                    'isotropic/import/no-restricted-paths': 'off',
                    'isotropic/import/no-self-import': 'error',
                    'isotropic/import/no-unassigned-import': 'off',
                    'isotropic/import/no-unresolved': [
                        'error',
                        {
                            amd: false,
                            caseSensitive: true,
                            commonjs: true,
                            esmodule: true,
                            ignore: [
                                '^.*Configuration(?:\\..*?)?\\.js$'
                            ]
                        }
                    ],
                    'isotropic/import/no-unused-modules': 'off',
                    'isotropic/import/no-useless-path-segments': [
                        'error',
                        {
                            commonjs: true,
                            noUselessIndex: false
                        }
                    ],
                    'isotropic/import/no-webpack-loader-syntax': 'error',
                    'isotropic/import/order': 'off',
                    'isotropic/import/prefer-default-export': 'warn',
                    'isotropic/import/unambiguous': 'warn',
                    'isotropic/node/callback-return': 'off',
                    'isotropic/node/exports-style': [
                        'warn',
                        'module.exports',
                        {
                            allowBatchAssign: false
                        }
                    ],
                    'isotropic/node/file-extension-in-import': 'off',
                    'isotropic/node/global-require': 'warn',
                    'isotropic/node/handle-callback-err': [
                        'error',
                        'error'
                    ],
                    'isotropic/node/hashbang': 'off',
                    'isotropic/node/no-callback-literal': 'off',
                    'isotropic/node/no-deprecated-api': 'error',
                    'isotropic/node/no-exports-assign': 'error',
                    'isotropic/node/no-extraneous-import': 'error',
                    'isotropic/node/no-extraneous-require': 'error',
                    'isotropic/node/no-missing-import': 'off',
                    'isotropic/node/no-missing-require': 'off',
                    'isotropic/node/no-mixed-requires': 'off',
                    'isotropic/node/no-new-require': 'error',
                    'isotropic/node/no-path-concat': 'off',
                    'isotropic/node/no-process-env': 'warn',
                    'isotropic/node/no-process-exit': 'warn',
                    'isotropic/node/no-restricted-import': 'off',
                    'isotropic/node/no-restricted-require': 'off',
                    'isotropic/node/no-sync': [
                        'warn',
                        {
                            allowAtRootLevel: true
                        }
                    ],
                    'isotropic/node/no-unpublished-bin': 'off',
                    'isotropic/node/no-unpublished-import': 'off',
                    'isotropic/node/no-unpublished-require': 'off',
                    'isotropic/node/no-unsupported-features/es-builtins': 'warn',
                    'isotropic/node/no-unsupported-features/es-syntax': 'off',
                    'isotropic/node/no-unsupported-features/node-builtins': 'warn',
                    'isotropic/node/prefer-global/buffer': [
                        'error',
                        'never'
                    ],
                    'isotropic/node/prefer-global/console': [
                        'warn',
                        'never'
                    ],
                    'isotropic/node/prefer-global/process': [
                        'error',
                        'never'
                    ],
                    'isotropic/node/prefer-global/text-decoder': [
                        'error',
                        'never'
                    ],
                    'isotropic/node/prefer-global/text-encoder': [
                        'error',
                        'never'
                    ],
                    'isotropic/node/prefer-global/url': [
                        'error',
                        'never'
                    ],
                    'isotropic/node/prefer-global/url-search-params': [
                        'error',
                        'never'
                    ],
                    'isotropic/node/prefer-node-protocol': 'error',
                    'isotropic/node/prefer-promises/dns': 'error',
                    'isotropic/node/prefer-promises/fs': 'error',
                    'isotropic/node/process-exit-as-throw': 'error',
                    'isotropic/prefer-date-now': 'error',
                    'isotropic/prefer-reflect-apply': 'error',
                    'isotropic/promise/always-return': 'off',
                    'isotropic/promise/avoid-new': 'off',
                    'isotropic/promise/catch-or-return': 'off',
                    'isotropic/promise/no-callback-in-promise': 'off',
                    'isotropic/promise/no-multiple-resolved': 'error',
                    'isotropic/promise/no-native': 'off',
                    'isotropic/promise/no-nesting': 'off',
                    'isotropic/promise/no-new-statics': 'error',
                    'isotropic/promise/no-promise-in-callback': 'off',
                    'isotropic/promise/no-return-in-finally': 'error',
                    'isotropic/promise/no-return-wrap': [
                        'error',
                        {
                            allowReject: false
                        }
                    ],
                    'isotropic/promise/param-names': 'error',
                    'isotropic/promise/prefer-await-to-callbacks': 'off',
                    'isotropic/promise/prefer-await-to-then': 'off',
                    'isotropic/promise/valid-params': 'error',
                    'isotropic/regexp/confusing-quantifier': 'error',
                    'isotropic/regexp/control-character-escape': 'error',
                    'isotropic/regexp/grapheme-string-literal': 'error',
                    'isotropic/regexp/hexadecimal-escape': [
                        'error',
                        'never'
                    ],
                    'isotropic/regexp/letter-case': [
                        'error',
                        {
                            caseInsensitive: 'lowercase',
                            controlEscape: 'uppercase',
                            hexadecimalEscape: 'lowercase',
                            unicodeEscape: 'lowercase'
                        }
                    ],
                    'isotropic/regexp/match-any': [
                        'error',
                        {
                            allows: [
                                '[\\s\\S]',
                                'dotAll'
                            ]
                        }
                    ],
                    'isotropic/regexp/negation': 'error',
                    'isotropic/regexp/no-contradiction-with-assertion': 'error',
                    'isotropic/regexp/no-control-character': 'off',
                    'isotropic/regexp/no-dupe-characters-character-class': 'error',
                    'isotropic/regexp/no-dupe-disjunctions': [
                        'warn',
                        {
                            report: 'all',
                            reportExponentialBacktracking: 'potential',
                            reportUnreachable: 'potential'
                        }
                    ],
                    'isotropic/regexp/no-empty-alternative': 'error',
                    'isotropic/regexp/no-empty-capturing-group': 'error',
                    'isotropic/regexp/no-empty-character-class': 'error',
                    'isotropic/regexp/no-empty-group': 'error',
                    'isotropic/regexp/no-empty-lookarounds-assertion': 'error',
                    'isotropic/regexp/no-empty-string-literal': 'error',
                    'isotropic/regexp/no-escape-backspace': 'error',
                    'isotropic/regexp/no-extra-lookaround-assertions': 'error',
                    'isotropic/regexp/no-invalid-regexp': 'error',
                    'isotropic/regexp/no-invisible-character': 'error',
                    'isotropic/regexp/no-lazy-ends': [
                        'error',
                        {
                            ignorePartial: true
                        }
                    ],
                    'isotropic/regexp/no-legacy-features': 'error',
                    'isotropic/regexp/no-misleading-capturing-group': [
                        'error',
                        {
                            reportBacktrackingEnds: true
                        }
                    ],
                    'isotropic/regexp/no-misleading-unicode-character': [
                        'error',
                        {
                            fixable: false
                        }
                    ],
                    'isotropic/regexp/no-missing-g-flag': [
                        'error',
                        {
                            strictTypes: true
                        }
                    ],
                    'isotropic/regexp/no-non-standard-flag': 'error',
                    'isotropic/regexp/no-obscure-range': 'error',
                    'isotropic/regexp/no-octal': 'error',
                    'isotropic/regexp/no-optional-assertion': 'error',
                    'isotropic/regexp/no-potentially-useless-backreference': 'warn',
                    'isotropic/regexp/no-standalone-backslash': 'error',
                    'isotropic/regexp/no-super-linear-backtracking': [
                        'warn',
                        {
                            report: 'potential'
                        }
                    ],
                    'isotropic/regexp/no-super-linear-move': [
                        'warn',
                        {
                            ignorePartial: false,
                            ignoreSticky: true,
                            report: 'potential'
                        }
                    ],
                    'isotropic/regexp/no-trivially-nested-assertion': 'error',
                    'isotropic/regexp/no-trivially-nested-quantifier': 'error',
                    'isotropic/regexp/no-unused-capturing-group': [
                        'error',
                        {
                            allowNamed: false,
                            fixable: false
                        }
                    ],
                    'isotropic/regexp/no-useless-assertions': 'error',
                    'isotropic/regexp/no-useless-backreference': 'error',
                    'isotropic/regexp/no-useless-character-class': [
                        'error',
                        {
                            ignores: []
                        }
                    ],
                    'isotropic/regexp/no-useless-dollar-replacements': 'error',
                    'isotropic/regexp/no-useless-escape': 'error',
                    'isotropic/regexp/no-useless-flag': [
                        'error',
                        {
                            ignore: [],
                            strictTypes: true
                        }
                    ],
                    'isotropic/regexp/no-useless-lazy': 'error',
                    'isotropic/regexp/no-useless-non-capturing-group': [
                        'error',
                        {
                            allowTop: 'partial'
                        }
                    ],
                    'isotropic/regexp/no-useless-quantifier': 'error',
                    'isotropic/regexp/no-useless-range': 'error',
                    'isotropic/regexp/no-useless-set-operand': 'error',
                    'isotropic/regexp/no-useless-string-literal': 'error',
                    'isotropic/regexp/no-useless-two-nums-quantifier': 'error',
                    'isotropic/regexp/no-zero-quantifier': 'error',
                    'isotropic/regexp/optimal-lookaround-quantifier': 'error',
                    'isotropic/regexp/optimal-quantifier-concatenation': [
                        'error',
                        {
                            capturingGroups: 'report'
                        }
                    ],
                    'isotropic/regexp/prefer-character-class': [
                        'error',
                        {
                            minAlternatives: 3
                        }
                    ],
                    'isotropic/regexp/prefer-d': [
                        'error',
                        {
                            insideCharacterClass: 'd'
                        }
                    ],
                    'isotropic/regexp/prefer-escape-replacement-dollar-char': 'error',
                    'isotropic/regexp/prefer-lookaround': [
                        'error',
                        {
                            lookbehind: true,
                            strictTypes: true
                        }
                    ],
                    'isotropic/regexp/prefer-named-backreference': 'error',
                    'isotropic/regexp/prefer-named-capture-group': 'off',
                    'isotropic/regexp/prefer-named-replacement': [
                        'error',
                        {
                            strictTypes: true
                        }
                    ],
                    'isotropic/regexp/prefer-plus-quantifier': 'error',
                    'isotropic/regexp/prefer-predefined-assertion': 'error',
                    'isotropic/regexp/prefer-quantifier': 'warn',
                    'isotropic/regexp/prefer-question-quantifier': 'error',
                    'isotropic/regexp/prefer-range': 'warn',
                    'isotropic/regexp/prefer-regexp-exec': 'error',
                    'isotropic/regexp/prefer-regexp-test': 'error',
                    'isotropic/regexp/prefer-result-array-groups': [
                        'error',
                        {
                            strictTypes: true
                        }
                    ],
                    'isotropic/regexp/prefer-set-operation': 'error',
                    'isotropic/regexp/prefer-star-quantifier': 'error',
                    'isotropic/regexp/prefer-unicode-codepoint-escapes': 'error',
                    'isotropic/regexp/prefer-w': 'error',
                    'isotropic/regexp/require-unicode-regexp': 'off',
                    'isotropic/regexp/require-unicode-sets-regexp': 'error',
                    'isotropic/regexp/simplify-set-operations': 'error',
                    'isotropic/regexp/sort-alternatives': 'error',
                    'isotropic/regexp/sort-character-class-elements': [
                        'error',
                        {
                            order: [
                                '\\d',
                                '\\p',
                                '\\q',
                                '\\s',
                                '\\w',
                                '*',
                                '[]'
                            ]
                        }
                    ],
                    'isotropic/regexp/sort-flags': 'error',
                    'isotropic/regexp/strict': 'error',
                    'isotropic/regexp/unicode-escape': [
                        'error',
                        'unicodeCodePointEscape'
                    ],
                    'isotropic/regexp/unicode-property': [
                        'error',
                        {
                            generalCategory: 'never',
                            key: 'short',
                            property: 'long'
                        }
                    ],
                    'isotropic/regexp/use-ignore-case': 'error',
                    'isotropic/sort-keys': [
                        'error',
                        {
                            caseSensitive: false,
                            direction: 'asc',
                            ignoreSpecialCharacters: true,
                            prefixPositions: {
                                _: 'last'
                            }
                        }
                    ],
                    'isotropic/sort-vars': [
                        'error',
                        {
                            caseSensitive: false,
                            direction: 'asc',
                            ignoreSpecialCharacters: true,
                            prefixPositions: {},
                            strictEmptyLines: true
                        }
                    ],
                    'isotropic/stylistic/array-bracket-newline': [
                        'error',
                        'consistent'
                    ],
                    'isotropic/stylistic/array-bracket-spacing': [
                        'error',
                        'never'
                    ],
                    'isotropic/stylistic/array-element-newline': [
                        'error',
                        'consistent'
                    ],
                    'isotropic/stylistic/arrow-parens': [
                        'error',
                        'as-needed'
                    ],
                    'isotropic/stylistic/arrow-spacing': [
                        'error',
                        {
                            after: true,
                            before: true
                        }
                    ],
                    'isotropic/stylistic/block-spacing': [
                        'error',
                        'never'
                    ],
                    'isotropic/stylistic/brace-style': [
                        'error',
                        '1tbs',
                        {
                            allowSingleLine: false
                        }
                    ],
                    'isotropic/stylistic/comma-dangle': [
                        'error',
                        'never'
                    ],
                    'isotropic/stylistic/comma-spacing': [
                        'error',
                        {
                            after: true,
                            before: false
                        }
                    ],
                    'isotropic/stylistic/comma-style': [
                        'error',
                        'last'
                    ],
                    'isotropic/stylistic/computed-property-spacing': [
                        'error',
                        'never',
                        {
                            enforceForClassMembers: true
                        }
                    ],
                    'isotropic/stylistic/dot-location': [
                        'error',
                        'property'
                    ],
                    'isotropic/stylistic/eol-last': [
                        'error',
                        'always'
                    ],
                    'isotropic/stylistic/function-call-argument-newline': [
                        'error',
                        'consistent'
                    ],
                    'isotropic/stylistic/function-call-spacing': [
                        'error',
                        'never'
                    ],
                    'isotropic/stylistic/function-paren-newline': [
                        'error',
                        'consistent'
                    ],
                    'isotropic/stylistic/generator-star-spacing': [
                        'error',
                        'after'
                    ],
                    'isotropic/stylistic/implicit-arrow-linebreak': [
                        'error',
                        'beside'
                    ],
                    'isotropic/stylistic/indent': [
                        'error',
                        4,
                        {
                            ArrayExpression: 1,
                            CallExpression: {
                                arguments: 1
                            },
                            flatTernaryExpressions: false,
                            FunctionDeclaration: {
                                body: 1,
                                parameters: 1
                            },
                            FunctionExpression: {
                                body: 1,
                                parameters: 1
                            },
                            ignoreComments: false,
                            ignoredNodes: [
                                'CallExpression[callee.object.type=\'TemplateLiteral\'] *',
                                'TemplateLiteral *'
                            ],
                            ImportDeclaration: 1,
                            MemberExpression: 1,
                            ObjectExpression: 1,
                            offsetTernaryExpressions: false,
                            outerIIFEBody: 1,
                            SwitchCase: 1,
                            VariableDeclarator: 1
                        }
                    ],
                    'isotropic/stylistic/indent-binary-ops': [
                        'error',
                        4
                    ],
                    'isotropic/stylistic/jsx-child-element-spacing': 'warn',
                    'isotropic/stylistic/jsx-closing-bracket-location': [
                        'error',
                        'line-aligned'
                    ],
                    'isotropic/stylistic/jsx-closing-tag-location': 'error',
                    'isotropic/stylistic/jsx-curly-brace-presence': 'off',
                    'isotropic/stylistic/jsx-curly-newline': [
                        'error',
                        'consistent'
                    ],
                    'isotropic/stylistic/jsx-curly-spacing': [
                        'error',
                        {
                            children: true,
                            when: 'never'
                        }
                    ],
                    'isotropic/stylistic/jsx-equals-spacing': [
                        'error',
                        'never'
                    ],
                    'isotropic/stylistic/jsx-first-prop-new-line': [
                        'error',
                        'always'
                    ],
                    'isotropic/stylistic/jsx-function-call-newline': [
                        'error',
                        'always'
                    ],
                    'isotropic/stylistic/jsx-indent': [
                        'error',
                        4
                    ],
                    'isotropic/stylistic/jsx-indent-props': [
                        'error',
                        4
                    ],
                    'isotropic/stylistic/jsx-max-props-per-line': [
                        'error',
                        {
                            maximum: 1,
                            when: 'always'
                        }
                    ],
                    'isotropic/stylistic/jsx-newline': [
                        'error',
                        {
                            allowMultilines: false,
                            prevent: true
                        }
                    ],
                    'isotropic/stylistic/jsx-one-expression-per-line': [
                        'error',
                        {
                            allow: 'none'
                        }
                    ],
                    'isotropic/stylistic/jsx-pascal-case': [
                        'warn',
                        {
                            allowAllCaps: false,
                            allowLeadingUnderscore: false,
                            allowNamespace: false
                        }
                    ],
                    'isotropic/stylistic/jsx-props-no-multi-spaces': 'error',
                    'isotropic/stylistic/jsx-quotes': [
                        'error',
                        'prefer-double'
                    ],
                    'isotropic/stylistic/jsx-self-closing-comp': [
                        'error',
                        {
                            component: true,
                            html: true
                        }
                    ],
                    'isotropic/stylistic/jsx-sort-props': [
                        'error',
                        {
                            callbacksLast: false,
                            ignoreCase: true,
                            locale: 'en',
                            multiline: 'ignore',
                            noSortAlphabetically: false,
                            reservedFirst: false,
                            shorthandFirst: false,
                            shorthandLast: false
                        }
                    ],
                    'isotropic/stylistic/jsx-tag-spacing': [
                        'error',
                        {
                            afterOpening: 'never',
                            beforeClosing: 'never',
                            beforeSelfClosing: 'always',
                            closingSlash: 'never'
                        }
                    ],
                    'isotropic/stylistic/jsx-wrap-multilines': 'off',
                    'isotropic/stylistic/key-spacing': [
                        'error',
                        {
                            afterColon: true,
                            beforeColon: false,
                            mode: 'strict'
                        }
                    ],
                    'isotropic/stylistic/keyword-spacing': [
                        'error',
                        {
                            after: true,
                            before: true,
                            overrides: {}
                        }
                    ],
                    'isotropic/stylistic/line-comment-position': 'off',
                    'isotropic/stylistic/linebreak-style': [
                        'error',
                        'unix'
                    ],
                    'isotropic/stylistic/lines-around-comment': 'off',
                    'isotropic/stylistic/lines-between-class-members': [
                        'error',
                        'never',
                        {
                            exceptAfterSingleLine: false
                        }
                    ],
                    'isotropic/stylistic/max-len': 'off',
                    'isotropic/stylistic/max-statements-per-line': [
                        'error',
                        {
                            max: 1
                        }
                    ],
                    'isotropic/stylistic/member-delimiter-style': [
                        'error',
                        {
                            multiline: {
                                delimiter: 'semi',
                                requireLast: true
                            },
                            multilineDetection: 'brackets',
                            singleline: {
                                delimiter: 'semi',
                                requireLast: true
                            }
                        }
                    ],
                    'isotropic/stylistic/multiline-comment-style': [
                        'warn',
                        'bare-block'
                    ],
                    'isotropic/stylistic/multiline-ternary': [
                        'error',
                        'always'
                    ],
                    'isotropic/stylistic/new-parens': 'error',
                    'isotropic/stylistic/newline-per-chained-call': 'off',
                    'isotropic/stylistic/no-confusing-arrow': [
                        'error',
                        {
                            allowParens: true,
                            onlyOneSimpleParam: false
                        }
                    ],
                    'isotropic/stylistic/no-extra-parens': [
                        'error',
                        'all',
                        {
                            conditionalAssign: true,
                            enforceForArrowConditionals: false,
                            enforceForFunctionPrototypeMethods: true,
                            enforceForNewInMemberExpressions: true,
                            enforceForSequenceExpressions: true,
                            ignoreJSX: 'none',
                            nestedBinaryExpressions: true,
                            returnAssign: true,
                            ternaryOperandBinaryExpressions: true
                        }
                    ],
                    'isotropic/stylistic/no-extra-semi': 'error',
                    'isotropic/stylistic/no-floating-decimal': 'off',
                    'isotropic/stylistic/no-mixed-operators': 'off',
                    'isotropic/stylistic/no-mixed-spaces-and-tabs': 'error',
                    'isotropic/stylistic/no-multi-spaces': 'error',
                    'isotropic/stylistic/no-multiple-empty-lines': [
                        'error',
                        {
                            max: 1
                        }
                    ],
                    'isotropic/stylistic/no-tabs': [
                        'error',
                        {
                            allowIndentationTabs: false
                        }
                    ],
                    'isotropic/stylistic/no-trailing-spaces': [
                        'error',
                        {
                            ignoreComments: false,
                            skipBlankLines: false
                        }
                    ],
                    'isotropic/stylistic/no-whitespace-before-property': 'error',
                    'isotropic/stylistic/nonblock-statement-body-position': [
                        'error',
                        'beside'
                    ],
                    'isotropic/stylistic/object-curly-newline': [
                        'error',
                        {
                            consistent: true,
                            minProperties: 1,
                            multiline: true
                        }
                    ],
                    'isotropic/stylistic/object-curly-spacing': [
                        'error',
                        'never'
                    ],
                    'isotropic/stylistic/object-property-newline': [
                        'error',
                        {
                            allowAllPropertiesOnSameLine: false
                        }
                    ],
                    'isotropic/stylistic/one-var-declaration-per-line': [
                        'error',
                        'always'
                    ],
                    'isotropic/stylistic/operator-linebreak': [
                        'error',
                        'after'
                    ],
                    'isotropic/stylistic/padded-blocks': [
                        'error',
                        'never',
                        {
                            allowSingleLineBlocks: false
                        }
                    ],
                    'isotropic/stylistic/padding-line-between-statements': [
                        'error',
                        {
                            blankLine: 'always',
                            next: '*',
                            prev: [
                                'block',
                                'block-like'
                            ]
                        },
                        {
                            blankLine: 'always',
                            next: '*',
                            prev: [
                                'const',
                                'let',
                                'var'
                            ]
                        },
                        {
                            blankLine: 'always',
                            next: '*',
                            prev: 'directive'
                        },
                        {
                            blankLine: 'any',
                            next: 'directive',
                            prev: 'directive'
                        },
                        {
                            blankLine: 'never',
                            next: 'case',
                            prev: '*'
                        }
                    ],
                    'isotropic/stylistic/quote-props': [
                        'error',
                        'as-needed'
                    ],
                    'isotropic/stylistic/quotes': [
                        'error',
                        'single',
                        {
                            allowTemplateLiterals: true,
                            avoidEscape: false,
                            ignoreStringLiterals: false
                        }
                    ],
                    'isotropic/stylistic/rest-spread-spacing': [
                        'error',
                        'never'
                    ],
                    'isotropic/stylistic/semi': [
                        'error',
                        'always',
                        {
                            omitLastInOneLineBlock: false,
                            omitLastInOneLineClassBody: false
                        }
                    ],
                    'isotropic/stylistic/semi-spacing': [
                        'error',
                        {
                            after: true,
                            before: false
                        }
                    ],
                    'isotropic/stylistic/semi-style': [
                        'error',
                        'last'
                    ],
                    'isotropic/stylistic/space-before-blocks': [
                        'error',
                        'always'
                    ],
                    'isotropic/stylistic/space-before-function-paren': [
                        'error',
                        'always'
                    ],
                    'isotropic/stylistic/space-in-parens': 'off',
                    'isotropic/stylistic/space-infix-ops': 'error',
                    'isotropic/stylistic/space-unary-ops': [
                        'error',
                        {
                            nonwords: false,
                            words: true
                        }
                    ],
                    'isotropic/stylistic/spaced-comment': [
                        'warn',
                        'always'
                    ],
                    'isotropic/stylistic/switch-colon-spacing': [
                        'error',
                        {
                            after: true,
                            before: false
                        }
                    ],
                    'isotropic/stylistic/template-curly-spacing': [
                        'error',
                        'never'
                    ],
                    'isotropic/stylistic/template-tag-spacing': [
                        'error',
                        'never'
                    ],
                    'isotropic/stylistic/type-annotation-spacing': 'off',
                    'isotropic/stylistic/type-generic-spacing': 'error',
                    'isotropic/stylistic/type-named-tuple-spacing': 'error',
                    'isotropic/stylistic/wrap-iife': [
                        'error',
                        'outside',
                        {
                            functionPrototypeMethods: true
                        }
                    ],
                    'isotropic/stylistic/wrap-regex': 'off',
                    'isotropic/stylistic/yield-star-spacing': [
                        'error',
                        'after'
                    ],
                    'isotropic/top-scope-prefix': [
                        'error',
                        {
                            prefix: '_'
                        }
                    ],
                    'logical-assignment-operators': [
                        'error',
                        'always',
                        {
                            enforceForIfStatements: false
                        }
                    ],
                    'max-classes-per-file': [
                        'error',
                        1
                    ],
                    'max-depth': 'off',
                    'max-lines': 'off',
                    'max-lines-per-function': 'off',
                    'max-nested-callbacks': 'off',
                    'max-params': 'off',
                    'max-statements': 'off',
                    'new-cap': 'warn',
                    'no-alert': 'warn',
                    'no-array-constructor': 'error',
                    'no-async-promise-executor': 'error',
                    'no-await-in-loop': 'off',
                    'no-bitwise': 'warn',
                    'no-caller': 'error',
                    'no-case-declarations': 'error',
                    'no-class-assign': 'error',
                    'no-compare-neg-zero': 'error',
                    'no-cond-assign': 'error',
                    'no-console': 'warn',
                    'no-const-assign': 'error',
                    'no-constant-binary-expression': 'error',
                    'no-constant-condition': [
                        'error',
                        {
                            checkLoops: 'allExceptWhileTrue'
                        }
                    ],
                    'no-constructor-return': 'error',
                    'no-continue': 'off',
                    'no-control-regex': 'off',
                    'no-debugger': 'error',
                    'no-delete-var': 'error',
                    'no-div-regex': 'off',
                    'no-dupe-args': 'error',
                    'no-dupe-class-members': 'error',
                    'no-dupe-else-if': 'error',
                    'no-dupe-keys': 'error',
                    'no-duplicate-case': 'error',
                    'no-duplicate-imports': [
                        'error',
                        {
                            includeExports: true
                        }
                    ],
                    'no-else-return': [
                        'error',
                        {
                            allowElseIf: true
                        }
                    ],
                    'no-empty': 'warn',
                    'no-empty-character-class': 'error',
                    'no-empty-function': [
                        'error',
                        {
                            allow: []
                        }
                    ],
                    'no-empty-pattern': 'error',
                    'no-empty-static-block': 'error',
                    'no-eq-null': 'error',
                    'no-eval': 'error',
                    'no-ex-assign': 'off',
                    'no-extend-native': 'warn',
                    'no-extra-bind': 'warn',
                    'no-extra-boolean-cast': [
                        'error',
                        {
                            enforceForInnerExpressions: true
                        }
                    ],
                    'no-extra-label': 'error',
                    'no-fallthrough': [
                        'error',
                        {
                            allowEmptyCase: false,
                            reportUnusedFallthroughComment: true
                        }
                    ],
                    'no-func-assign': 'error',
                    'no-global-assign': 'error',
                    'no-implicit-coercion': [
                        'error',
                        {
                            boolean: false,
                            disallowTemplateShorthand: false,
                            number: false,
                            string: true
                        }
                    ],
                    'no-implicit-globals': 'off',
                    'no-implied-eval': 'error',
                    'no-import-assign': 'error',
                    'no-inline-comments': 'off',
                    'no-inner-declarations': [
                        'error',
                        'functions',
                        {
                            blockScopedFunctions: 'allow'
                        }
                    ],
                    'no-invalid-regexp': 'off',
                    'no-invalid-this': [
                        'warn',
                        {
                            capIsConstructor: false
                        }
                    ],
                    'no-irregular-whitespace': [
                        'error',
                        {
                            skipComments: false,
                            skipJSXText: false,
                            skipRegExps: false,
                            skipStrings: false,
                            skipTemplates: false
                        }
                    ],
                    'no-iterator': 'error',
                    'no-label-var': 'warn',
                    'no-labels': [
                        'error',
                        {
                            allowLoop: true,
                            allowSwitch: false
                        }
                    ],
                    'no-lone-blocks': 'warn',
                    'no-lonely-if': 'warn',
                    'no-loop-func': 'error',
                    'no-loss-of-precision': 'error',
                    'no-magic-numbers': 'off',
                    'no-misleading-character-class': [
                        'error',
                        {
                            allowEscape: true
                        }
                    ],
                    'no-multi-assign': 'error',
                    'no-multi-str': 'error',
                    'no-negated-condition': 'error',
                    'no-nested-ternary': 'off',
                    'no-new': 'warn',
                    'no-new-func': 'error',
                    'no-new-native-nonconstructor': 'error',
                    'no-new-wrappers': 'error',
                    'no-nonoctal-decimal-escape': 'error',
                    'no-obj-calls': 'error',
                    'no-object-constructor': 'error',
                    'no-octal': 'error',
                    'no-octal-escape': 'error',
                    'no-param-reassign': 'off',
                    'no-plusplus': 'error',
                    'no-promise-executor-return': [
                        'error',
                        {
                            allowVoid: false
                        }
                    ],
                    'no-proto': 'error',
                    'no-prototype-builtins': 'off',
                    'no-redeclare': 'error',
                    'no-regex-spaces': 'error',
                    'no-reserved-keys': 'off',
                    'no-restricted-exports': 'off',
                    'no-restricted-globals': [
                        'error',
                        {
                            message: 'Use isotropic-error instead.',
                            name: 'AggregateError'
                        },
                        {
                            message: 'Use isotropic-error instead.',
                            name: 'Error'
                        },
                        {
                            message: 'Use isotropic-error instead.',
                            name: 'EvalError'
                        },
                        {
                            message: 'Use isotropic-error instead.',
                            name: 'InternalError'
                        },
                        {
                            message: 'Use Number.isNaN instead.',
                            name: 'isNaN'
                        },
                        {
                            message: 'Use isotropic-error instead.',
                            name: 'RangeError'
                        },
                        {
                            message: 'Use isotropic-error instead.',
                            name: 'ReferenceError'
                        },
                        {
                            message: 'Use isotropic-later instead.',
                            name: 'setImmediate'
                        },
                        {
                            message: 'Use isotropic-later instead.',
                            name: 'setInterval'
                        },
                        {
                            message: 'Use isotropic-later instead.',
                            name: 'setTimeout'
                        },
                        {
                            message: 'Use isotropic-error instead.',
                            name: 'SyntaxError'
                        },
                        {
                            message: 'Use isotropic-error instead.',
                            name: 'TypeError'
                        },
                        {
                            message: 'Use isotropic-error instead.',
                            name: 'URIError'
                        }
                    ],
                    'no-restricted-imports': 'off',
                    'no-restricted-properties': 'off',
                    'no-restricted-syntax': 'off',
                    'no-return-assign': 'error',
                    'no-return-await': 'error', // TODO: This rule is deprecated, unclear why, it still seems useful.
                    'no-script-url': 'warn',
                    'no-self-assign': [
                        'error',
                        {
                            props: true
                        }
                    ],
                    'no-self-compare': 'error',
                    'no-sequences': 'error',
                    'no-setter-return': 'error',
                    'no-shadow': 'off',
                    'no-shadow-restricted-names': 'error',
                    'no-sparse-arrays': 'warn',
                    'no-template-curly-in-string': 'warn',
                    'no-ternary': 'off',
                    'no-this-before-super': 'error',
                    'no-throw-literal': 'error',
                    'no-undef': 'error',
                    'no-undef-init': 'error',
                    'no-undefined': 'error',
                    'no-underscore-dangle': 'off',
                    'no-unexpected-multiline': 'error',
                    'no-unmodified-loop-condition': 'error',
                    'no-unneeded-ternary': 'error',
                    'no-unreachable': 'warn',
                    'no-unreachable-loop': 'error',
                    'no-unsafe-finally': 'warn',
                    'no-unsafe-negation': [
                        'error',
                        {
                            enforceForOrderingRelations: true
                        }
                    ],
                    'no-unsafe-optional-chaining': [
                        'error',
                        {
                            disallowArithmeticOperators: true
                        }
                    ],
                    'no-unused-expressions': 'warn',
                    'no-unused-labels': 'warn',
                    'no-unused-private-class-members': 'warn',
                    'no-unused-vars': [
                        'warn',
                        {
                            args: 'after-used',
                            caughtErrors: 'none',
                            destructuredArrayIgnorePattern: '^_',
                            ignoreClassWithStaticInitBlock: false,
                            ignoreRestSiblings: true,
                            vars: 'all'
                        }
                    ],
                    'no-use-before-define': [
                        'error',
                        {
                            allowNamedExports: false,
                            classes: true,
                            functions: true,
                            variables: true
                        }
                    ],
                    'no-useless-assignment': 'error',
                    'no-useless-backreference': 'error',
                    'no-useless-call': 'error',
                    'no-useless-catch': 'error',
                    'no-useless-computed-key': [
                        'error',
                        {
                            enforceForClassMembers: true
                        }
                    ],
                    'no-useless-concat': 'error',
                    'no-useless-constructor': 'error',
                    'no-useless-escape': 'off',
                    'no-useless-rename': [
                        'error',
                        {
                            ignoreDestructuring: false,
                            ignoreExport: false,
                            ignoreImport: false
                        }
                    ],
                    'no-useless-return': 'error',
                    'no-var': 'error',
                    'no-void': 'off',
                    'no-warning-comments': [
                        'warn',
                        {
                            location: 'start',
                            terms: [
                                'todo'
                            ]
                        }
                    ],
                    'no-with': 'error',
                    'object-shorthand': [
                        'error',
                        'always',
                        {
                            avoidExplicitReturnArrows: false,
                            avoidQuotes: false,
                            ignoreConstructors: false
                        }
                    ],
                    'one-var': [
                        'error',
                        'always'
                    ],
                    'operator-assignment': [
                        'error',
                        'always'
                    ],
                    'prefer-arrow-callback': 'warn',
                    'prefer-const': [
                        'warn',
                        {
                            destructuring: 'all',
                            ignoreReadBeforeAssign: true
                        }
                    ],
                    'prefer-destructuring': 'off',
                    'prefer-exponentiation-operator': 'error',
                    'prefer-named-capture-group': 'off',
                    'prefer-numeric-literals': 'error',
                    'prefer-object-has-own': 'error',
                    'prefer-object-spread': 'error',
                    'prefer-promise-reject-errors': 'error',
                    'prefer-regex-literals': 'error',
                    'prefer-rest-params': 'warn',
                    'prefer-spread': 'error',
                    'prefer-template': 'warn',
                    radix: 'error',
                    'require-atomic-updates': 'off',
                    'require-await': 'warn',
                    'require-unicode-regexp': 'off',
                    'require-yield': 'warn',
                    'sort-imports': [
                        'error',
                        {
                            allowSeparatedGroups: false,
                            ignoreCase: true,
                            ignoreDeclarationSort: false,
                            ignoreMemberSort: false,
                            memberSyntaxSortOrder: [
                                'none',
                                'all',
                                'multiple',
                                'single'
                            ]
                        }
                    ],
                    'sort-keys': 'off',
                    'sort-vars': 'off',
                    'space-in-brackets': 'off',
                    strict: [
                        'error',
                        'global'
                    ],
                    'symbol-description': 'error',
                    'unicode-bom': [
                        'error',
                        'never'
                    ],
                    'use-isnan': [
                        'error',
                        {
                            enforceForIndexOf: true,
                            enforceForSwitchCase: true
                        }
                    ],
                    'valid-typeof': [
                        'error',
                        {
                            requireStringLiterals: false
                        }
                    ],
                    'vars-on-top': 'off',
                    yoda: [
                        'error',
                        'never',
                        {
                            exceptRange: false,
                            onlyEquality: false
                        }
                    ]
                }
            }
        },
        meta: {
            name: _packageDefinition.name,
            version: _packageDefinition.version
        },
        rules: {
            'filename-must-match-pattern': _filenameMustMatchPattern,
            'filename-must-not-match-pattern': _filenameMustNotMatchPattern,
            'prefer-date-now': _preferDateNow,
            'prefer-reflect-apply': _preferReflectApply,
            'sort-keys': _sortKeys,
            'sort-vars': _sortVars,
            'top-scope-prefix': _topScopePrefix,
            ...Object.entries({
                'eslint-comments': _eslintPluginEslintComments.rules,
                import: _eslintPluginImportX.rules,
                node: _eslintPluginN.rules,
                promise: _eslintPluginPromise.rules,
                regexp: _eslintPluginRegexp.rules,
                stylistic: _eslintPluginStylistic.rules
            }).reduce((rules, [
                prefix,
                pluginRules
            ]) => {
                Object.keys(pluginRules).forEach(ruleName => {
                    rules[`${prefix}/${ruleName}`] = pluginRules[ruleName];
                });

                return rules;
            }, [])
        }
    };

_eslintPluginIsotropic.configs.isotropic.plugins.isotropic = _eslintPluginIsotropic;

export default _eslintPluginIsotropic;
