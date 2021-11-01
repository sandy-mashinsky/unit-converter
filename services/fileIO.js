const fs = require('fs');
const {Graph} = require('./conversionManager');

const readConversionFile = (fileName) => {
    try {
        return fs.readFileSync(fileName, 'utf8').toString();
    } catch (err) {
        throw new Error(err);
    }
};

const addConversionToFile = (fileName, srcUnit, destinationUnit, conversionValue) => {
    try {
        const conversionFormat = `\n1 ${srcUnit} = ${conversionValue} ${destinationUnit}`
        fs.appendFileSync(fileName, conversionFormat);
    } catch (err) {
        throw new Error(err);
    }
}

module.exports.readConversionFile = readConversionFile;
module.exports.addConversionToFile = addConversionToFile;
