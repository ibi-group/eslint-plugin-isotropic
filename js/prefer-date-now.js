export default {
    create: context => ({
        CallExpression (node) {
            if (
                node.callee &&
                node.callee.object &&
                node.callee.object.type === 'NewExpression' &&
                node.callee.object.callee &&
                node.callee.object.callee.type === 'Identifier' &&
                node.callee.object.callee.name === 'Date' &&
                (
                    !Array.isArray(node.callee.object.arguments) ||
                    node.callee.object.arguments.length === 0
                ) &&
                node.callee.property &&
                node.callee.property.type === 'Identifier' &&
                node.callee.property.name === 'getTime'
            ) {
                context.report({
                    messageId: 'preferDateNow',
                    node
                });
            }
        }
    }),
    meta: {
        docs: {
            description: 'require `Date.now`',
            recommended: true,
            url: 'https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/prefer-date-now.md'
        },
        messages: {
            preferDateNow: 'Avoid using new Date().getTime(), instead use Date.now().'
        },
        schema: [],
        type: 'suggestion'
    }
};
