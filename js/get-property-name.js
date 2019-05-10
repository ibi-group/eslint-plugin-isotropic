export default property => {
    switch (property.key && property.key.type) {
        case 'Identifier':
            return property.key.name;
        case 'Literal':
            return `${property.key.value}`;
        case 'TemplateLiteral':
            if (!property.key.expressions.length && property.key.quasis.length === 1) {
                return property.key.quasis[0].value.cooked;
            }

            break;
    }
};
