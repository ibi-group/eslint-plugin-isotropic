const _getIsTopScope = (scope, sourceType) => {
    switch (scope.type) {
        case 'function':
            if (sourceType === 'commonjs' && scope.upper?.type === 'global') {
                return true;
            }

            break;
        case 'global':
        case 'module':
            return true;
    }

    return false;
};

export default {
    create: context => {
        const [{
                prefix = '_'
            } = {}] = context.options,

            checkScope = scope => {
                const isTopScope = _getIsTopScope(scope, context.languageOptions.sourceType);

                for (const variable of scope.variables) {
                    if (variable.name.startsWith(prefix)) {
                        if (!isTopScope) {
                            variable.identifiers.forEach(identifier => {
                                context.report({
                                    data: {
                                        prefix,
                                        variableName: variable.name
                                    },
                                    messageId: 'unexpectedChildScopePrefix',
                                    node: identifier
                                });
                            });
                        }
                    } else if (isTopScope) {
                        variable.identifiers.forEach(identifier => {
                            context.report({
                                data: {
                                    prefix,
                                    variableName: variable.name
                                },
                                messageId: 'topScopePrefix',
                                node: identifier
                            });
                        });
                    }
                }

                for (const childScope of scope.childScopes) {
                    checkScope(childScope);
                }
            };

        return {
            'Program:exit' (node) {
                checkScope(context.sourceCode.getScope(node));
            }
        };
    },
    meta: {
        docs: {
            description: 'require prefixed variables in top scope',
            recommended: true,
            url: 'https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/top-scope-prefix.md'
        },
        messages: {
            topScopePrefix: 'Expected top scope variable `{{variableName}}` to have prefix `{{prefix}}`.',
            unexpectedChildScopePrefix: 'Unexpected prefix `{{prefix}}` on child scope variable `{{variableName}}`.'
        },
        schema: [{
            additionalProperties: false,
            properties: {
                prefix: {
                    type: 'string'
                }
            },
            type: 'object'
        }],
        type: 'suggestion'
    }
};
