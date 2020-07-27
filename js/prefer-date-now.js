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
                    message: 'Avoid using new Date().getTime(), instead use Date.now().',
                    node
                });
            }
        }
    }),
    meta: {
        docs: {
            category: 'ECMAScript 6',
            description: 'require `Date.now`',
            recommended: true
        },
        fixable: null,
        schema: []
    }
};
