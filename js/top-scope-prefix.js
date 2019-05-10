export default {
    create: context => {
        const [{
                prefix = '_'
            } = {}] = context.options,
            checkScope = scope => {
                for (const variable of scope.variables) {
                    const hasPrefix = variable.name.startsWith(prefix);

                    switch (scope.type) {
                        case 'global':
                        case 'module':
                            if (!hasPrefix) {
                                variable.identifiers.forEach(identifier => {
                                    context.report({
                                        data: {
                                            prefix,
                                            variableName: variable.name
                                        },
                                        message: 'Expected top scope variable `{{variableName}}` to have prefix `{{prefix}}`.',
                                        node: identifier
                                    });
                                });
                            }

                            break;
                        default:
                            if (hasPrefix) {
                                variable.identifiers.forEach(identifier => {
                                    context.report({
                                        data: {
                                            prefix,
                                            variableName: variable.name
                                        },
                                        message: 'Unexpected prefix `{{prefix}}` on child scope variable `{{variableName}}`.',
                                        node: identifier
                                    });
                                });
                            }

                            break;
                    }
                }

                for (const childScope of scope.childScopes) {
                    checkScope(childScope);
                }
            };

        return {
            'Program:exit' () {
                checkScope(context.getScope());
            }
        };
    },
    meta: {
        docs: {
            category: 'Stylistic Issues',
            description: 'require prefixed variables in top scope',
            recommended: true
        },
        fixable: null,
        schema: [{
            additionalProperties: false,
            properties: {
                prefix: {
                    type: 'string'
                }
            },
            type: 'object'
        }]
    }
};
