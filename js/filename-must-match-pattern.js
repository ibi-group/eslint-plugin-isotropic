import _path from 'node:path';

export default {
    create: context => ({
        Program (node) {
            const absoluteFilepath = context.getFilename(),
                filename = _path.basename(absoluteFilepath, _path.extname(absoluteFilepath)),
                {
                    flags,
                    pattern
                } = context.options[0];

            if (!new RegExp(pattern, flags).test(filename)) {
                context.report({
                    data: {
                        filename: context.getFilename(),
                        pattern: `/${pattern}/${flags}`
                    },
                    messageId: 'filenameMustMatchPattern',
                    node
                });
            }
        }
    }),
    meta: {
        docs: {
            description: 'require filename matches pattern',
            recommended: true,
            url: 'https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/filename-must-match-pattern.md'
        },
        messages: {
            filenameMustMatchPattern: 'Filename \'{{filename}}\' does not match {{pattern}}.'
        },
        schema: [{
            additionalProperties: false,
            properties: {
                flags: {
                    type: 'string'
                },
                pattern: {
                    type: 'string'
                }
            },
            required: [
                'pattern'
            ],
            type: 'object'
        }],
        type: 'suggestion'
    }
};
