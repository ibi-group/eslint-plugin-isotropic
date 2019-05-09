import * as _eslintConfigIsotropic from 'eslint-config-isotropic';
import * as _eslintPluginEslintComments from 'eslint-plugin-eslint-comments';
import _preferReflectApply from './prefer-reflect-apply.js';
import _sortKeys from './sort-keys.js';

const configs = {
        isotropic: {
            ..._eslintConfigIsotropic
        }
    },
    rules = {
        ..._eslintPluginEslintComments.rules,
        'prefer-reflect-apply': _preferReflectApply,
        'sort-keys': _sortKeys
    };

configs.isotropic.rules = {
    ...configs.isotropic.rules,
    'isotropic/disable-enable-pair': 'warn',
    'isotropic/no-aggregating-enable': 'error',
    'isotropic/no-duplicate-disable': 'error',
    'isotropic/no-restricted-disable': 'off',
    'isotropic/no-unlimited-disable': 'error',
    'isotropic/no-unused-disable': 'error',
    'isotropic/no-unused-enable': 'error',
    'isotropic/no-use': 'warn',
    'isotropic/prefer-reflect-apply': 'error',
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
    ]
};

export {
    configs,
    rules
};
