export default {
    create: context => ({
        CallExpression (node) {
            const {
                callee: {
                    object: {
                        name: objectName
                    } = {},
                    property: {
                        name: propertyName
                    } = {}
                }
            } = node;

            switch (propertyName) {
                case 'apply':
                case 'call':
                    if (objectName !== 'Reflect') {
                        context.report({
                            data: {
                                propertyName
                            },
                            message: 'Avoid using Function.prototype.{{propertyName}}, instead use Reflect.apply.',
                            node
                        });
                    }
            }
        }
    }),
    meta: {
        docs: {
            category: 'ECMAScript 6',
            description: 'require `Reflect.apply`',
            recommended: true
        },
        fixable: null,
        schema: []
    }
};
