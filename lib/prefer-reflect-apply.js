export default {
    create: context => {
        const sourceCode = context.sourceCode;

        return {
            CallExpression (node) {
                const {
                    callee
                } = node;

                if (callee.type !== 'MemberExpression' || callee.computed) {
                    return;
                }

                if (callee.property.name !== 'apply' && callee.property.name !== 'call') {
                    return;
                }

                if (callee.object.type === 'Identifier' && callee.object.name === 'Reflect') {
                    return;
                }

                context.report({
                    data: {
                        propertyName: callee.property.name
                    },
                    fix: fixer => {
                        const firstArgument = node.arguments[0],
                            objectText = sourceCode.getText(callee.object),
                            thisArgument = firstArgument ?
                                sourceCode.getText(firstArgument) :
                                'undefined';

                        if (callee.property.name === 'call') {
                            if (firstArgument?.type === 'SpreadElement') {
                                return null;
                            }

                            return fixer.replaceText(node, `Reflect.apply(${objectText}, ${thisArgument}, [${node.arguments.slice(1).map(argument => sourceCode.getText(argument)).join(', ')}])`);
                        }

                        if (node.arguments.length > 2 || node.arguments.some(argument => argument.type === 'SpreadElement')) {
                            return null;
                        }

                        if (node.arguments.length > 1) {
                            return fixer.replaceText(node, `Reflect.apply(${objectText}, ${thisArgument}, ${sourceCode.getText(node.arguments[1])})`);
                        }

                        return fixer.replaceText(node, `Reflect.apply(${objectText}, ${thisArgument}, [])`);
                    },
                    messageId: 'preferReflectApply',
                    node
                });
            }
        };
    },
    meta: {
        docs: {
            description: 'require `Reflect.apply`',
            recommended: true,
            url: 'https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/prefer-reflect-apply.md'
        },
        fixable: 'code',
        messages: {
            preferReflectApply: 'Avoid using Function.prototype.{{propertyName}}, instead use Reflect.apply.'
        },
        schema: [],
        type: 'problem'
    }
};
