class Unit {
    constructor(name) {
        this.name = name;
        this.adjacents = new Map();
    }

    getName() {
        return this.name;
    }

    addAdjacent(node, conversionValue) {
        this.adjacents.set(node.getName(), [node, conversionValue]);
    }

    getAdjacents() {
        return this.adjacents;
    }

    isAdjacent = (name) => {
        return this.adjacents.has(name);
    }
}

class Graph {
    constructor() {
        this.nodes = new Map();
    }

    getSize() {
        return this.nodes.size;
    }

    hasConversion = (from, to) => {
        return this.nodes.has(from) && this.nodes.get(from).isAdjacent(to);
    };

    addConversion = (from, to, value) => {
        const fromNode = this.addUnit(from);
        const toNode = this.addUnit(to);

        fromNode.addAdjacent(toNode, value);
        toNode.addAdjacent(fromNode, 1 / value);

        return [fromNode, toNode];
    };

    addUnit = (name) => {
        if (this.nodes.has(name)) {
            return this.nodes.get(name);
        } else {
            const vertex = new Unit(name);
            this.nodes.set(name, vertex);
            return vertex;
        }
    };

    shortestPathBfs = (from, to) => {
        const visited = new Set();
        const startNode = this.nodes.get(from);
        const queue = [];

        if (startNode !== undefined) {
            queue.push({node: startNode, conversionValue: 1});
            visited.add(from);

            while (queue.length > 0) {
                const {node, conversionValue} = queue.shift();
                if (node.getName() === to) return conversionValue;

                node.getAdjacents().forEach(([neighbourNode, value]) => {
                    if (!visited.has(neighbourNode.getName())) {
                        queue.push({node: neighbourNode, conversionValue: conversionValue * value});
                        visited.add(neighbourNode.getName());
                    }
                });
            }
        }

        return -1;
    };
}

module.exports.Graph = Graph;