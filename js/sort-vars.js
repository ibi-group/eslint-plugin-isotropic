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
                            if (/^\s*$/u.test(sourceCode.lines[lineIndex])) {
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
                                    message: 'Expected properties to be in order. \'{{propertyName}}\' should be before \'{{previousPropertyName}}\'.',
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
                                message: 'Unexpected empty line between \'{{previousPropertyName}}\' and \'{{propertyName}}\'.',
                                node: property.key
                            });
                        }
                    }

                    return property;
                }, null);
            },
            VariableDeclaration (node) {
                node.declarations.reduce((previousDeclaration, declaration) => {
                    if (declaration.id.type !== 'Identifier') {
                        return previousDeclaration;
                    }

                    if (previousDeclaration) {
                        const emptyLineIndexes = [];

                        for (let lineIndex = previousDeclaration.loc.end.line; lineIndex < declaration.id.loc.start.line - 1; lineIndex += 1) {
                            if (/^\s*$/u.test(sourceCode.lines[lineIndex])) {
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
                                    message: 'Expected variables to be in order. \'{{identifierName}}\' should be before \'{{previousIdentifierName}}\'.',
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
                                message: 'Unexpected empty line between \'{{previousIdentifierName}}\' and \'{{identifierName}}\'.',
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
            category: 'Stylistic Issues',
            description: 'require variable declarations to be sorted',
            recommended: true
        },
        fixable: null,
        schema: [
            {
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
            }
        ]
    }
};
