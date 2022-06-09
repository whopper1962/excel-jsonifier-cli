let CREATED_OBJECT = {};

function createObjectBasedOnBlueprint (objectBlueprint, eol) {
  for (let i = 0; i < objectBlueprint.length; i++) {
    if (objectBlueprint[i].parents.length > 0) {
      for(let index = 0; index < objectBlueprint[i].parents.length; index++) {
        if (index === 0) {
          let key = objectBlueprint[i].parents[index];
          if (key === null) {
            global.route0 = CREATED_OBJECT;
            continue;
          }
          if (!isKeyAlreadyExists(CREATED_OBJECT, key)) {
            CREATED_OBJECT[key] = {};
          }
          global.route0 = CREATED_OBJECT[key];
        } else {
          if (objectBlueprint[i].parents[index] === null) {
            eval(`global.route${index} = route${index - 1}`);
            continue;
          }
          eval(`CURRENT_OBJECT = route${index - 1}`);
          if (!isKeyAlreadyExists(CURRENT_OBJECT, objectBlueprint[i].parents[index])) {
            eval(`route${index - 1}[objectBlueprint[${i}].parents[${index}]] = {}`);
          }
          eval(`global.route${index} = route${index - 1}[objectBlueprint[${i}].parents[${index}]]`);
        }
      }
      eval(`CURRENT_OBJECT = route${objectBlueprint[i].parents.length - 1}`);
      if (!isKeyAlreadyExists(CURRENT_OBJECT, objectBlueprint[i].keyAndValue.key)) {
        let value = `${objectBlueprint[i].keyAndValue.value}`;
        let eolFilteredValue = value.replace(/\r?\n/g, eol);
        eval(`CURRENT_OBJECT.${objectBlueprint[i].keyAndValue.key} = '${eolFilteredValue.trim()}'`);
      }
    } else {
      for (let index2 = 0; index2 < objectBlueprint.length; index2++) {
        let value = `${objectBlueprint[index2].keyAndValue.value}`;
        let eolFilteredValue = eol === false ? value : value.replace(/\r?\n/g, eol);
        CREATED_OBJECT[objectBlueprint[index2].keyAndValue.key] = eolFilteredValue.trim();
      }
    }
  }
  return CREATED_OBJECT;
}

function isKeyAlreadyExists (obj, key) {
  if(obj[key] == undefined){
    return false;
  }else{
    return true;
  }
}

module.exports = {
  createObjectBasedOnBlueprint
};
