export default {
    create: context => {
        const candidates = [],
            functionTypes = new Set([
                'ArrowFunctionExpression',
                'FunctionDeclaration',
                'FunctionExpression'
            ]),
            getReadPath = identifier => {
                const keys = [];

                let node = identifier;

                while (node.parent.type === 'MemberExpression' && node.parent.object === node) {
                    const member = node.parent;

                    if (member.computed) {
                        if (member.property.type !== 'Literal') {
                            return keys;
                        }

                        keys.push(`${member.property.value}`);
                    } else {
                        keys.push(member.property.name);
                    }

                    node = member;
                }

                if (node.parent.type === 'CallExpression' && node.parent.callee === node && keys.length !== 0) {
                    keys.pop();
                }

                return keys;
            },
            getTargetPath = node => {
                const keys = [];

                while (node.type === 'MemberExpression') {
                    if (node.computed) {
                        if (node.property.type === 'Literal') {
                            keys.unshift(`${node.property.value}`);
                        } else {
                            keys.length = 0;
                        }
                    } else {
                        keys.unshift(node.property.name);
                    }

                    node = node.object;
                }

                return {
                    keys,
                    root: node
                };
            },
            importedBindings = {
                loggerName: null,
                nodeProcessName: null,
                processName: null
            },
            isDeclaredWithin = (variable, range) => variable.scope.block.range[0] >= range[0],
            isTimeCapture = node => {
                if (node.type === 'NewExpression') {
                    return node.callee.type === 'Identifier' && node.callee.name === 'Date' && node.arguments.length === 0;
                }

                if (node.type === 'MemberExpression' && !node.computed && node.object.type === 'Identifier') {
                    switch (node.object.name) {
                        case 'Date':
                            return node.property.name === 'now';
                        case 'performance':
                            return node.property.name === 'now';
                        case 'Temporal':
                            return node.property.name === 'Now';
                        case importedBindings.loggerName:
                            return node.property.name === 'task';
                        case importedBindings.nodeProcessName:
                        case importedBindings.processName:
                            switch (node.property.name) {
                                case 'hrtime':
                                case 'uptime':
                                    return true;
                            }

                            return false;
                    }

                    return false;
                }
            },
            loopTypes = new Set([
                'DoWhileStatement',
                'ForInStatement',
                'ForOfStatement',
                'ForStatement',
                'WhileStatement'
            ]),
            mutations = [],
            pathsConflict = (keysA, keysB) => {
                const length = keysA.length < keysB.length ?
                    keysA.length :
                    keysB.length;

                let index = 0;

                while (index < length) {
                    if (keysA[index] !== keysB[index]) {
                        return false;
                    }

                    index += 1;
                }

                return true;
            },
            sourceCode = context.sourceCode,
            thisBindingTypes = new Set([
                'FunctionDeclaration',
                'FunctionExpression',
                'Program',
                'StaticBlock'
            ]),

            getThisScope = node => {
                let scopeNode = node.parent;

                while (!thisBindingTypes.has(scopeNode.type)) {
                    scopeNode = scopeNode.parent;
                }

                return scopeNode;
            },
            isReferencedInLoopOrNestedFunction = (declarator, identifier) => {
                let node = identifier.parent;

                while (node !== declarator.parent.parent) {
                    if (functionTypes.has(node.type) || loopTypes.has(node.type)) {
                        return true;
                    }

                    node = node.parent;
                }

                return false;
            },
            resolveRoot = identifier => {
                let scope = sourceCode.getScope(identifier);

                while (scope) {
                    const variable = scope.set.get(identifier.name);

                    if (variable) {
                        return variable;
                    }

                    scope = scope.upper;
                }

                return null;
            },

            getRootKey = node => {
                if (node.type === 'Identifier') {
                    return resolveRoot(node);
                }

                if (node.type === 'ThisExpression') {
                    return getThisScope(node);
                }

                return null;
            },

            collectDependencies = init => {
                let capturesTime = false;

                const dependencies = [],
                    initRange = init.range,

                    collectReferences = scope => {
                        for (const reference of scope.references) {
                            const identifier = reference.identifier;

                            if (reference.isRead() && reference.resolved && identifier.range[0] >= initRange[0] && identifier.range[1] <= initRange[1] && !isDeclaredWithin(reference.resolved, initRange)) {
                                dependencies.push({
                                    keys: getReadPath(identifier),
                                    root: reference.resolved
                                });
                            }
                        }

                        for (const childScope of scope.childScopes) {
                            collectReferences(childScope);
                        }
                    },
                    walkNode = node => {
                        if (!node) {
                            return;
                        }

                        if (node.type === 'ThisExpression') {
                            dependencies.push({
                                keys: getReadPath(node),
                                root: getThisScope(node)
                            });
                        } else if (isTimeCapture(node)) {
                            capturesTime = true;
                        }

                        for (const key of sourceCode.visitorKeys[node.type]) {
                            const child = node[key];

                            if (Array.isArray(child)) {
                                child.forEach(walkNode);
                            } else {
                                walkNode(child);
                            }
                        }
                    };

                collectReferences(sourceCode.getScope(init));
                walkNode(init);

                return {
                    capturesTime,
                    dependencies
                };
            },
            recordMutation = (targetNode, mutationNode) => {
                const targetPath = getTargetPath(targetNode),

                    root = getRootKey(targetPath.root);

                if (root) {
                    mutations.push({
                        keys: targetPath.keys,
                        range: mutationNode.range,
                        root
                    });
                }
            };

        return {
            AssignmentExpression (node) {
                recordMutation(node.left, node);
            },
            CallExpression (node) {
                if (node.callee.type === 'MemberExpression') {
                    recordMutation(node.callee.object, node);
                }
            },
            ImportDeclaration (node) {
                switch (node.source.value) {
                    case 'isotropic-logger':
                        for (const specifier of node.specifiers) {
                            if (specifier.type === 'ImportDefaultSpecifier') {
                                importedBindings.loggerName = specifier.local.name;
                                break;
                            }
                        }

                        break;
                    case 'node:process':
                        for (const specifier of node.specifiers) {
                            if (specifier.type === 'ImportDefaultSpecifier') {
                                importedBindings.nodeProcessName = specifier.local.name;
                                break;
                            }
                        }

                        break;
                    case 'process':
                        for (const specifier of node.specifiers) {
                            if (specifier.type === 'ImportDefaultSpecifier') {
                                importedBindings.processName = specifier.local.name;
                                break;
                            }
                        }

                        break;
                }
            },
            'Program:exit' () {
                for (const candidate of candidates) {
                    const analysis = collectDependencies(candidate.declarator.init),
                        initEnd = candidate.declarator.init.range[1],
                        useStart = candidate.useIdentifier.range[0];

                    if (!analysis.capturesTime && !mutations.some(mutation => mutation.range[0] >= initEnd && mutation.range[1] <= useStart && analysis.dependencies.some(dependency => dependency.root === mutation.root && pathsConflict(dependency.keys, mutation.keys)))) {
                        context.report({
                            data: {
                                variableName: candidate.declarator.id.name
                            },
                            messageId: 'unnecessaryVariable',
                            node: candidate.declarator.id
                        });
                    }
                }
            },
            UnaryExpression (node) {
                if (node.operator === 'delete') {
                    recordMutation(node.argument, node);
                }
            },
            UpdateExpression (node) {
                recordMutation(node.argument, node);
            },
            VariableDeclarator (node) {
                if (node.parent.kind !== 'const' || !node.init || node.id.type !== 'Identifier' || node.parent.parent.type === 'Program') {
                    return;
                }

                const [variable] = sourceCode.getDeclaredVariables(node),
                    readReferences = variable.references.filter(reference => reference.isRead());

                if (readReferences.length === 1 && !isReferencedInLoopOrNestedFunction(node, readReferences[0].identifier)) {
                    candidates.push({
                        declarator: node,
                        useIdentifier: readReferences[0].identifier
                    });
                }
            }
        };
    },
    meta: {
        docs: {
            description: 'disallow variables that are only used once',
            recommended: true,
            url: 'https://github.com/ibi-group/eslint-plugin-isotropic/blob/master/docs/rules/no-unnecessary-variable.md'
        },
        messages: {
            unnecessaryVariable: 'Variable \'{{variableName}}\' is only used once; inline its value instead of declaring a variable.'
        },
        schema: [],
        type: 'suggestion'
    }
};
