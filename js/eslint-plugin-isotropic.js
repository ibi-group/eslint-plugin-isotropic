import * as _eslintConfigIsotropic from 'eslint-config-isotropic';
import * as _eslintPluginEslintComments from 'eslint-plugin-eslint-comments';
import * as _eslintPluginFilenames from 'eslint-plugin-filenames';
import * as _eslintPluginImport from 'eslint-plugin-import';
import * as _eslintPluginNode from 'eslint-plugin-node';
import * as _eslintPluginPromise from 'eslint-plugin-promise';
import _preferDateNow from './prefer-date-now.js';
import _preferReflectApply from './prefer-reflect-apply.js';
import _sortKeys from './sort-keys.js';
import _sortVars from './sort-vars.js';
import _topScopePrefix from './top-scope-prefix.js';

const _configs = {
        isotropic: {
            ..._eslintConfigIsotropic
        }
    },
    _plugins = {
        'eslint-comments': _eslintPluginEslintComments,
        filenames: _eslintPluginFilenames,
        import: _eslintPluginImport,
        node: _eslintPluginNode,
        promise: _eslintPluginPromise
    },
    _rules = {
        'prefer-date-now': _preferDateNow,
        'prefer-reflect-apply': _preferReflectApply,
        'sort-keys': _sortKeys,
        'sort-vars': _sortVars,
        'top-scope-prefix': _topScopePrefix
    };

Object.keys(_plugins).forEach(prefix => {
    const rules = _plugins[prefix].rules;

    Object.keys(rules).forEach(name => {
        _rules[`${prefix}/${name}`] = rules[name];
    });
});

_configs.isotropic.rules = {
    ..._configs.isotropic.rules,
    'isotropic/eslint-comments/disable-enable-pair': 'warn',
    'isotropic/eslint-comments/no-aggregating-enable': 'error',
    'isotropic/eslint-comments/no-duplicate-disable': 'error',
    'isotropic/eslint-comments/no-restricted-disable': 'off',
    'isotropic/eslint-comments/no-unlimited-disable': 'error',
    'isotropic/eslint-comments/no-unused-disable': 'error',
    'isotropic/eslint-comments/no-unused-enable': 'error',
    'isotropic/eslint-comments/no-use': 'warn',
    'isotropic/eslint-comments/require-description': 'error',
    'isotropic/filenames/match-exported': 'off',
    'isotropic/filenames/match-regex': [
        'warn',
        '^(?:[0-9a-z](?:[-.0-9a-z]*?[0-9a-z])?)|(?:Configuration(?:\\.[0-9a-z](?:[-.0-9a-z]*?[0-9a-z])?)?)$',
        false
    ],
    'isotropic/filenames/no-index': 'warn',
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
    'isotropic/import/no-extraneous-dependencies': [
        'error',
        {
            bundledDependencies: true,
            devDependencies: true,
            optionalDependencies: true,
            packageDir: '.',
            peerDependencies: true

        }
    ],
    'isotropic/import/no-internal-modules': 'off',
    'isotropic/import/no-mutable-exports': 'warn',
    'isotropic/import/no-named-as-default': 'warn',
    'isotropic/import/no-named-as-default-member': 'warn',
    'isotropic/import/no-named-default': 'error',
    'isotropic/import/no-named-export': 'off',
    'isotropic/import/no-namespace': 'off',
    'isotropic/import/no-nodejs-modules': 'off',
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
    'isotropic/node/no-restricted-modules': 'off',
    'isotropic/node/no-restricted-require': 'off',
    'isotropic/node/no-sync': [
        'warn',
        {
            allowAtRootLevel: false
        }
    ],
    'isotropic/node/no-unpublished-bin': 'off',
    'isotropic/node/no-unpublished-import': 'off',
    'isotropic/node/no-unpublished-require': 'off',
    'isotropic/node/no-unsupported-features/es-builtins': 'warn',
    'isotropic/node/no-unsupported-features/es-syntax': 'off',
    'isotropic/node/no-unsupported-features/node-builtins': 'warn',
    'isotropic/node/prefer-global/buffer': 'off',
    'isotropic/node/prefer-global/console': 'off',
    'isotropic/node/prefer-global/process': 'off',
    'isotropic/node/prefer-global/text-decoder': 'off',
    'isotropic/node/prefer-global/text-encoder': 'off',
    'isotropic/node/prefer-global/url': 'off',
    'isotropic/node/prefer-global/url-search-params': 'off',
    'isotropic/node/prefer-promises/dns': 'error',
    'isotropic/node/prefer-promises/fs': 'error',
    'isotropic/node/process-exit-as-throw': 'error',
    'isotropic/node/shebang': 'off',
    'isotropic/prefer-date-now': 'error',
    'isotropic/prefer-reflect-apply': 'error',
    'isotropic/promise/always-return': 'off',
    'isotropic/promise/avoid-new': 'off',
    'isotropic/promise/catch-or-return': 'off',
    'isotropic/promise/no-callback-in-promise': 'off',
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
    'isotropic/top-scope-prefix': [
        'error',
        {
            prefix: '_'
        }
    ]
};

export {
    _configs as configs,
    _rules as rules
};
