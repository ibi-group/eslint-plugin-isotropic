export default {
    create: context => {
        const importedBindings = {
                errorName: null,
                loggerName: null
            },
            isErrorExpression = expression => importedBindings.errorName !== null && expression.type === 'CallExpression' && expression.callee.type === 'Identifier' && expression.callee.name === importedBindings.errorName,
            isMisplacedErrorProperty = property => {
                if (property.type !== 'Property' || property.computed || !isErrorExpression(property.value)) {
                    return false;
                }

                if (property.key.type === 'Identifier') {
                    return property.key.name !== 'error';
                }

                return property.key.value !== 'error';
            },
            logLevelNames = new Set([
                'debug',
                'error',
                'fatal',
                'info',
                'trace',
                'warn'
            ]);

        return {
            CallExpression (node) {
                if (importedBindings.loggerName === null || node.callee.type !== 'MemberExpression' || node.callee.computed || node.callee.object.type !== 'Identifier' || node.callee.object.name !== importedBindings.loggerName || !logLevelNames.has(node.callee.property.name)) {
                    return;
                }

                const [
                    firstArgument
                ] = node.arguments;

                if (firstArgument && firstArgument.type === 'ObjectExpression') {
                    firstArgument.properties.forEach(property => {
                        if (isMisplacedErrorProperty(property)) {
                            context.report({
                                messageId: 'loggerErrorProperty',
                                node: property.value
                            });
                        }
                    });
                }

                node.arguments.forEach(argument => {
                    if (isErrorExpression(argument)) {
                        context.report({
                            messageId: 'loggerErrorProperty',
                            node: argument
                        });
                    }
                });
            },
            ImportDeclaration (node) {
                if (node.source.value !== 'isotropic-error' && node.source.value !== 'isotropic-logger') {
                    return;
                }

                const defaultSpecifier = node.specifiers.find(specifier => specifier.type === 'ImportDefaultSpecifier');

                if (!defaultSpecifier) {
                    return;
                }

                if (node.source.value === 'isotropic-error') {
                    importedBindings.errorName = defaultSpecifier.local.name;

                    return;
                }

                importedBindings.loggerName = defaultSpecifier.local.name;
            }
        };
    },
    meta: {
        docs: {
            description: 'require errors to be logged as the `error` property with isotropic-logger',
            recommended: true,
            url: 'https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/logger-error-property.md'
        },
        languages: [
            'js/js'
        ],
        messages: {
            loggerErrorProperty: 'Pass the error as the `error` property of the metadata object so the isotropic-logger error serializer is applied.'
        },
        schema: [],
        type: 'problem'
    }
};
