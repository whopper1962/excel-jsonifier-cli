const util = require('util');
// const json = require('./ja.json');
let keysAndValues = [];
let routeAndValues = [];

function getDeepObjectKeys (obj, keys = [], family = [], cachedFamily = [], parents = [], currentParentKey = '') {
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
      // 同名のキーがあった場合の対策として現在の親キーをキャッシュ
      currentParentKey = key;
      // recursive
      getDeepObjectKeys(obj[key], keys, family, cachedFamily, parents, currentParentKey);
    } else if (typeof obj[key] === 'string' && obj[key] !== null) {
      let cloneParents = [];
      if (family.indexOf(key) === -1) {
        if (cachedFamily.indexOf(key) !== -1) {
          cloneParents = createParentsClone(parents, key);
        }
      } else {
        cloneParents = createParentsClone(parents, key, currentParentKey);
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

function createParentsClone (parents, key, currentParentKey) {
  let cloneParents = [];
  let keyIndex = null;
  let parentIndex = null;
  for (let i = 0; i < parents.length; i++) {
    let arr = parents[i].fam;
    parentIndex = i;
    keyIndex = arr.indexOf(key);
    if (keyIndex !== -1 && arr.key === currentParentKey) break;
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
    console.log('json', json);
    getDeepObjectKeys(json);
    format();
    console.log(util.inspect(routeAndValues, {maxArrayLength: null}));
    return routeAndValues;
  }
}