import _getPropertyName from './get-property-name.js';
import _naturalSort from 'isotropic-natural-sort';

export default {
    create: context => {
        const [{
                caseSensitive = false,
                direction = 'asc',
                ignoreSpecialCharacters = true,
                prefixPositions = {
                    _: 'last'
                }
            } = {}] = context.options,
            naturalSort = _naturalSort({
                caseSensitive,
                direction,
                ignoreSpecialCharacters,
                prefixPositions
            });

        return {
            ObjectExpression (node) {
                node.properties.reduce((previousPropertyName, property) => {
                    const propertyName = _getPropertyName(property);

                    if (!propertyName) {
                        return previousPropertyName;
                    }

                    if (previousPropertyName && naturalSort(previousPropertyName, propertyName) > 0) {
                        context.report({
                            data: {
                                previousPropertyName,
                                propertyName
                            },
                            message: 'Expected object keys to be in order. \'{{propertyName}}\' should be before \'{{previousPropertyName}}\'.',
                            node: property.key
                        });
                    }

                    return propertyName;
                }, null);
            }
        };
    },
    meta: {
        docs: {
            category: 'Stylistic Issues',
            description: 'require object keys to be sorted',
            recommended: true
        },
        fixable: null,
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
                }
            },
            type: 'object'
        }]
    }
};
