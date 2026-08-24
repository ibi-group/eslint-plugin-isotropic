import _path from 'node:path';

export default {
    create: context => ({
        Program (node) {
            const absoluteFilepath = context.filename,
                {
                    flags,
                    pattern
                } = context.options[0];

            if (!new RegExp(pattern, flags).test(_path.basename(absoluteFilepath, _path.extname(absoluteFilepath)))) {
                context.report({
                    data: {
                        filename: context.filename,
                        pattern: `/${pattern}/${flags}`
                    },
                    messageId: 'filenameMustMatchPattern',
                    node
                });
            }
        }
    }),
    meta: {
        defaultOptions: [{
            flags: ''
        }],
        docs: {
            description: 'require filename matches pattern',
            recommended: true,
            url: 'https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/filename-must-match-pattern.md'
        },
        languages: [
            'js/js'
        ],
        messages: {
            filenameMustMatchPattern: 'Filename \'{{filename}}\' does not match {{pattern}}.'
        },
        schema: [{
            additionalProperties: false,
            properties: {
                flags: {
                    description: 'regular expression flags',
                    type: 'string'
                },
                pattern: {
                    description: 'regular expression pattern',
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
