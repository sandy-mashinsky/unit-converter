const {Graph} = require('../models/Graph');
const {readConversionFile, addConversionToFile} = require('./fileIO');

let graph = new Graph();

const generateGraph = (fileName) => {
    const data = readConversionFile(fileName);
    data.split('\n').forEach(line => {
        const [srcUnit, destinationUnit] = line.split(' = ').map(word => word.split(' '));
        const srcUnitName = srcUnit[1];
        const [destinationUnitValue, destinationUnitName] = [parseInt(destinationUnit[0]), destinationUnit[1]];

        graph.addConversion(srcUnitName, destinationUnitName, destinationUnitValue)
    });
};

const addConversion = (fileName, srcUnit, destinationUnit, conversionValue) => {
    try {
        if(!graph.hasConversion(srcUnit, destinationUnit)) {
            addConversionToFile(fileName, srcUnit, destinationUnit, conversionValue);
            graph.addConversion(srcUnit, destinationUnit, conversionValue);
        }
    } catch (err) {
        throw new Error(err);
    }
};

const findConversion = (servingUnit, convertTo) => {
    if(graph.getSize() > 0) {
        return graph.shortestPathBfs(servingUnit, convertTo);
    }

    return -1;
};

module.exports.addConversion = addConversion;
module.exports.generateGraph = generateGraph;
module.exports.findConversion = findConversion;
