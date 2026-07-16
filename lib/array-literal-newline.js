const _separator = (hasComma, lineBreak) => {
    if (lineBreak) {
        if (hasComma) {
            return ',\n';
        }

        return '\n';
    }

    if (hasComma) {
        return ', ';
    }

    return '';
};

export default {
    create: context => {
        const sourceCode = context.sourceCode,
            validateGap = (node, leftToken, rightToken, hasComma, lineBreak) => {
                if (leftToken.loc.end.line === rightToken.loc.start.line) {
                    if (!lineBreak) {
                        return;
                    }
                } else if (lineBreak) {
                    return;
                }

                context.report({
                    fix: fixer => {
                        if (sourceCode.commentsExistBetween(leftToken, rightToken)) {
                            return null;
                        }

                        return fixer.replaceTextRange([
                            leftToken.range[1],
                            rightToken.range[0]
                        ], _separator(hasComma, lineBreak));
                    },
                    loc: {
                        end: rightToken.loc.start,
                        start: leftToken.loc.end
                    },
                    messageId: lineBreak ?
                        'missingLineBreak' :
                        'unexpectedLineBreak',
                    node
                });
            };

        return {
            ArrayExpression (node) {
                const closeBracket = sourceCode.getLastToken(node),
                    elements = node.elements,
                    lineBreak = !elements.every(element => element !== null && (element.type === 'ArrayExpression' || element.type === 'ObjectExpression')),
                    openBracket = sourceCode.getFirstToken(node);

                if (elements.some(element => element === null)) {
                    return;
                }

                if (elements.length === 0) {
                    if (openBracket.loc.end.line !== closeBracket.loc.start.line) {
                        context.report({
                            fix: fixer => {
                                if (sourceCode.commentsExistBetween(openBracket, closeBracket)) {
                                    return null;
                                }

                                return fixer.replaceTextRange([
                                    openBracket.range[1],
                                    closeBracket.range[0]
                                ], '');
                            },
                            messageId: 'unexpectedLineBreakInEmptyArray',
                            node
                        });
                    }

                    return;
                }

                elements.forEach((element, index) => {
                    validateGap(
                        node,
                        index === 0 ?
                            openBracket :
                            sourceCode.getLastToken(elements[index - 1]),
                        sourceCode.getFirstToken(element),
                        index !== 0,
                        lineBreak
                    );
                });

                validateGap(node, sourceCode.getLastToken(elements[elements.length - 1]), closeBracket, false, lineBreak);
            }
        };
    },
    meta: {
        docs: {
            description: 'enforce consistent line breaks in array literals',
            recommended: true,
            url: 'https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/array-literal-newline.md'
        },
        fixable: 'code',
        messages: {
            missingLineBreak: 'A line break is required here because at least one array element is not an array or object literal.',
            unexpectedLineBreak: 'A line break is not allowed here because every array element is an array or object literal.',
            unexpectedLineBreakInEmptyArray: 'An empty array literal must not contain a line break.'
        },
        schema: [],
        type: 'layout'
    }
};
