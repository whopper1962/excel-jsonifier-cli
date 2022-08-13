const {generateKeysAndValueObject} = require('./readJsonData');
let parentLengths = [];

module.exports = {
  async generateExcelData (jsonData) {
    const routeAndValues = generateKeysAndValueObject(jsonData);
    for (let i = 0; i < routeAndValues.length; i++) {
      parentLengths.push(routeAndValues[i].route.length);
    }
    return {
      routesAndValues: routeAndValues,
      maxParentLength: Math.max(...parentLengths)
    }
  }
}