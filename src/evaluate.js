const { environment } = require('./standard-library');
const last = collection => collection[collection.length - 1];

const apply = node => {
    const fn = environment[node.name];
    const args = node.arguments.map(evaluate);
    if (typeof fn !== 'function') {
        throw new TypeError(`${node.name} is not a functiion`);
    }

    return fn(...args);
};

const getIdentifier = node => {
    if (environment[node.name]) return environment[node.name];
    throw new ReferenceError(`${node.name} is not defined`);
}

const evaluate = (node) => {
    if(node.type === 'CallExpression') return apply(node);
    if(node.type === 'Identifier') return getIdentifier(node);
    if(node.value) return node.value;
};

module.exports = { evaluate };
