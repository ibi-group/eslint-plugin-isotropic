import _eslintPluginEslintPlugin from 'eslint-plugin-eslint-plugin';
import _eslintPluginIsotropic from './lib/eslint-plugin-isotropic.js';

export default [
    _eslintPluginIsotropic.configs.isotropic,
    {
        plugins: {
            'eslint-plugin': _eslintPluginEslintPlugin
        },
        rules: {
            'eslint-plugin/consistent-output': 'error',
            'eslint-plugin/fixer-return': 'error',
            'eslint-plugin/meta-property-ordering': 'off',
            'eslint-plugin/no-deprecated-context-methods': 'error',
            'eslint-plugin/no-deprecated-report-api': 'error',
            'eslint-plugin/no-identical-tests': 'error',
            'eslint-plugin/no-missing-message-ids': 'error',
            'eslint-plugin/no-missing-placeholders': 'error',
            'eslint-plugin/no-only-tests': 'error',
            'eslint-plugin/no-property-in-node': 'error',
            'eslint-plugin/no-unused-message-ids': 'error',
            'eslint-plugin/no-unused-placeholders': 'error',
            'eslint-plugin/no-useless-token-range': 'error',
            'eslint-plugin/prefer-message-ids': 'error',
            'eslint-plugin/prefer-object-rule': 'error',
            'eslint-plugin/prefer-output-null': 'error',
            'eslint-plugin/prefer-placeholders': 'error',
            'eslint-plugin/prefer-replace-text': 'error',
            'eslint-plugin/report-message-format': 'off',
            'eslint-plugin/require-meta-docs-description': 'error',
            'eslint-plugin/require-meta-docs-recommended': 'error',
            'eslint-plugin/require-meta-docs-url': 'error',
            'eslint-plugin/require-meta-fixable': 'error',
            'eslint-plugin/require-meta-has-suggestions': 'error',
            'eslint-plugin/require-meta-schema': 'error',
            'eslint-plugin/require-meta-type': 'error',
            'eslint-plugin/test-case-property-ordering': 'off',
            'eslint-plugin/test-case-shorthand-strings': [
                'error',
                'never'
            ]
        }
    }
];
