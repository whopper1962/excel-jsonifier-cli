// const json = require('./ja.json');
let keysAndValues = [];
let routeAndValues = [];

function getDeepObjectKeys (obj, keys = [], family = [], cachedFamily = [], parents = []) {
  for (const key of Object.keys(obj)) {
    keys.push(key);
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      let parentObj = {
        key: key,
        fam: Object.keys(obj[key])
      };
      if (family.indexOf(key) === -1) {
        parents = [parentObj];
      } else {
        parents.push(parentObj);
      }
      cachedFamily = family.slice();
      family = Object.keys(obj[key]);
      getDeepObjectKeys(obj[key], keys, family, cachedFamily, parents);
    } else if (typeof obj[key] === 'string' && obj[key] !== null) {
      let cloneParents = [];
      if (family.indexOf(key) === -1) {
        if (cachedFamily.indexOf(key) !== -1) {
          cloneParents = createParentsClone(parents, key);
        }
      } else {
        cloneParents = createParentsClone(parents, key);
      }
      keysAndValues.push({
        parents: cloneParents,
        key: key,
        value: obj[key]
      });
    }
  }
  return keys;
}

function createParentsClone (parents, key) {
  let cloneParents = [];
  let keyIndex = null;
  let parentIndex = null;
  for (let i = 0; i < parents.length; i++) {
    let arr = parents[i].fam;
    parentIndex = i;
    keyIndex = arr.indexOf(key);
    if (keyIndex !== -1) break;
  }
  for (let i = 0; i <= parentIndex; i++) {
    cloneParents.push(parents[i].key);
  }
  return cloneParents;
}

function format () {
  for (let i = 0; i < keysAndValues.length; i++) {
    let arr = keysAndValues[i].parents;
    arr.unshift(keysAndValues[i].key);
    let route = arr.join('.');
    routeAndValues.push({
      route: arr,
      value: keysAndValues[i].value
    });
  }
}

module.exports = {
  generateKeysAndValueObject (json) {
    getDeepObjectKeys(json);
    format();
    return routeAndValues;
  }
}