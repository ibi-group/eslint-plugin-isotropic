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
                            messageId: 'preferReflectApply',
                            node
                        });
                    }
            }
        }
    }),
    meta: {
        docs: {
            description: 'require `Reflect.apply`',
            recommended: true,
            url: 'https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/prefer-reflect-apply.md'
        },
        messages: {
            preferReflectApply: 'Avoid using Function.prototype.{{propertyName}}, instead use Reflect.apply.'
        },
        schema: [],
        type: 'problem'
    }
};
