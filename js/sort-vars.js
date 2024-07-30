import _getPropertyName from './get-property-name.js';
import _naturalSort from 'isotropic-natural-sort';

export default {
    create: context => {
        const [{
                caseSensitive = false,
                direction = 'asc',
                ignoreSpecialCharacters = true,
                prefixPositions = {},
                strictEmptyLines = true
            } = {}] = context.options,
            naturalSort = _naturalSort({
                caseSensitive,
                direction,
                ignoreSpecialCharacters,
                prefixPositions
            }),
            sourceCode = context.getSourceCode();

        return {
            ObjectPattern (node) {
                node.properties.reduce((previousProperty, property) => {
                    const propertyName = _getPropertyName(property);

                    if (!propertyName) {
                        return previousProperty;
                    }

                    if (previousProperty) {
                        const emptyLineIndexes = [],
                            previousPropertyName = _getPropertyName(previousProperty);

                        for (let lineIndex = previousProperty.loc.end.line; lineIndex < property.key.loc.start.line - 1; lineIndex += 1) {
                            if (/^\s*$/v.test(sourceCode.lines[lineIndex])) {
                                emptyLineIndexes.push(lineIndex);
                            }
                        }

                        if (naturalSort(previousPropertyName, propertyName) > 0) {
                            if (strictEmptyLines && emptyLineIndexes.length !== 1 || !strictEmptyLines && emptyLineIndexes.length === 0) {
                                context.report({
                                    data: {
                                        previousPropertyName,
                                        propertyName
                                    },
                                    messageId: 'sortProps',
                                    node: property.key
                                });
                            }
                        } else if (strictEmptyLines && emptyLineIndexes.length) {
                            context.report({
                                data: {
                                    previousPropertyName,
                                    propertyName
                                },
                                loc: {
                                    end: {
                                        column: 0,
                                        line: emptyLineIndexes[emptyLineIndexes.length - 1] + 1
                                    },
                                    start: {
                                        column: 0,
                                        line: emptyLineIndexes[0] + 1
                                    }
                                },
                                messageId: 'unexpectedEmptyLineBetweenProperties',
                                node: property.key
                            });
                        }
                    }

                    return property;
                }, null);
            },
            VariableDeclaration (node) {
                const ignoreLineIndexSet = new Set();

                node.declarations.reduce((previousDeclaration, declaration) => {
                    if (declaration.id.type !== 'Identifier') {
                        for (let lineIndex = declaration.loc.start.line; lineIndex < declaration.loc.end.line; lineIndex += 1) {
                            ignoreLineIndexSet.add(lineIndex);
                        }

                        return previousDeclaration;
                    }

                    if (previousDeclaration) {
                        const emptyLineIndexes = [];

                        for (let lineIndex = previousDeclaration.loc.end.line; lineIndex < declaration.id.loc.start.line - 1; lineIndex += 1) {
                            if (!ignoreLineIndexSet.has(lineIndex) && /^\s*$/v.test(sourceCode.lines[lineIndex])) {
                                emptyLineIndexes.push(lineIndex);
                            }
                        }

                        if (naturalSort(previousDeclaration.id.name, declaration.id.name) > 0) {
                            if (strictEmptyLines && emptyLineIndexes.length !== 1 || !strictEmptyLines && emptyLineIndexes.length === 0) {
                                context.report({
                                    data: {
                                        identifierName: declaration.id.name,
                                        previousIdentifierName: previousDeclaration.id.name
                                    },
                                    messageId: 'sortVars',
                                    node: declaration.id
                                });
                            }
                        } else if (strictEmptyLines && emptyLineIndexes.length) {
                            context.report({
                                data: {
                                    identifierName: declaration.id.name,
                                    previousIdentifierName: previousDeclaration.id.name
                                },
                                loc: {
                                    end: {
                                        column: 0,
                                        line: emptyLineIndexes[emptyLineIndexes.length - 1] + 1
                                    },
                                    start: {
                                        column: 0,
                                        line: emptyLineIndexes[0] + 1
                                    }
                                },
                                messageId: 'unexpectedEmptyLineBetweenIdentifiers',
                                node: declaration.id
                            });
                        }
                    }

                    return declaration;
                }, null);
            }
        };
    },
    meta: {
        docs: {
            description: 'require variable declarations to be sorted',
            recommended: true,
            url: 'https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/sort-vars.md'
        },
        messages: {
            sortProps: 'Expected properties to be in order. \'{{propertyName}}\' should be before \'{{previousPropertyName}}\'.',
            sortVars: 'Expected variables to be in order. \'{{identifierName}}\' should be before \'{{previousIdentifierName}}\'.',
            unexpectedEmptyLineBetweenIdentifiers: 'Unexpected empty line between \'{{previousIdentifierName}}\' and \'{{identifierName}}\'.',
            unexpectedEmptyLineBetweenProperties: 'Unexpected empty line between \'{{previousPropertyName}}\' and \'{{propertyName}}\'.'
        },
        schema: [{
            additionalProperties: false,
            properties: {
                caseSensitive: {
                    type: 'boolean'
                },
                direction: {
                    enum: [
                        'asc',
                        'desc'
                    ],
                    type: 'string'
                },
                ignoreSpecialCharacters: {
                    type: 'boolean'
                },
                prefixPositions: {
                    type: 'object'
                },
                strictEmptyLines: {
                    type: 'boolean'
                }
            },
            type: 'object'
        }],
        type: 'suggestion'
    }
};
