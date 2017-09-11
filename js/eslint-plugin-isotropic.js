import * as _eslintComments from 'eslint-plugin-eslint-comments';
import * as _isotropic from 'eslint-config-isotropic';
import _sortKeys from './sort-keys.js';

_isotropic = Object.assign({}, _isotropic);
_isotropic.rules = Object.assign(_isotropic.rules, {
    'isotropic/disable-enable-pair': 'warn',
    'isotropic/no-duplicate-disable': 'error',
    'isotropic/no-unlimited-disable': 'error',
    'isotropic/no-unused-disable': 'error',
    'isotropic/no-unused-enable': 'error',
    'isotropic/no-use': 'warn',
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
});

const configs = {
        isotropic: _isotropic
    },
    rules = {
        ..._eslintComments.rules,
        'sort-keys': _sortKeys
    };

export {
    configs,
    rules
};
