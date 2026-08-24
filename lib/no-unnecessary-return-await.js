export default {
    create: context => {
        const sourceCode = context.sourceCode;

        return {
            AwaitExpression (node) {
                if (node.parent.type !== 'ReturnStatement' && !(node.parent.type === 'ArrowFunctionExpression' && node.parent.body === node)) {
                    return;
                }

                let current = node,
                    unnecessary = true;

                while (current) {
                    const ancestor = current.parent;

                    if (ancestor.type === 'TryStatement' && (ancestor.block === current || ancestor.handler === current && ancestor.finalizer)) {
                        unnecessary = false;
                        break;
                    }

                    if (ancestor.type === 'ArrowFunctionExpression' || ancestor.type === 'FunctionDeclaration' || ancestor.type === 'FunctionExpression') {
                        break;
                    }

                    current = ancestor;
                }

                if (unnecessary) {
                    context.report({
                        fix: fixer => fixer.removeRange([
                            sourceCode.getFirstToken(node).range[0],
                            node.argument.range[0]
                        ]),
                        messageId: 'unnecessaryReturnAwait',
                        node
                    });
                }
            }
        };
    },
    meta: {
        docs: {
            description: 'disallow unnecessary `await` of a returned value',
            recommended: true,
            url: 'https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/no-unnecessary-return-await.md'
        },
        fixable: 'code',
        languages: [
            'js/js'
        ],
        messages: {
            unnecessaryReturnAwait: 'Unnecessary `await` of a returned value outside of a try block.'
        },
        schema: [],
        type: 'suggestion'
    }
};
