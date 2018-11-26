import _astUtils from 'eslint/lib/util/ast-utils.js';
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
        } = {}] = context.options;

        let object = null;

        return {
            ObjectExpression () {
                object = {
                    parentObject: object,
                    previousPropertyName: null
                };
            },
            'ObjectExpression:exit' () {
                object = object.parentObject;
            },
            Property (node) {
                if (node.parent.type === 'ObjectPattern') {
                    return;
                }

                const previousPropertyName = object.previousPropertyName,
                    propertyName = _astUtils.getStaticPropertyName(node) || node.key.name || null;

                if (propertyName) {
                    object.previousPropertyName = propertyName;
                } else {
                    return;
                }

                if (!previousPropertyName) {
                    return;
                }

                if (_naturalSort({
                    caseSensitive,
                    direction,
                    ignoreSpecialCharacters,
                    prefixPositions
                })(previousPropertyName, propertyName) > 0) {
                    context.report({
                        data: {
                            previousPropertyName,
                            propertyName
                        },
                        loc: node.key.loc,
                        message: 'Expected object keys to be in order. \'{{propertyName}}\' should be before \'{{previousPropertyName}}\'.',
                        node
                    });
                }
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
                    }
                },
                type: 'object'
            }
        ]
    }
};
