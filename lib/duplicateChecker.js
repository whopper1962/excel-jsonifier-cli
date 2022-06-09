function checkKeyDuplicate (blueprintForCreatingJSON) {
  const NUMBER_OF_PARENT_KEYS = blueprintForCreatingJSON[0].parents.length;
  let IS_MAIN_KEY_DUPLICATED = false;
  let DUPLICATED_KEY = '';
  for (let index1 = 0; index1 < blueprintForCreatingJSON.length; index1++) {
    const DUPLICATE_CHECK_TARGET = blueprintForCreatingJSON[index1];
    for (let index2 = 0; index2 < blueprintForCreatingJSON.length; index2++) {
      if (index2 === blueprintForCreatingJSON.indexOf(DUPLICATE_CHECK_TARGET)) continue;
      let parentKeysDuplicateCheckResults = [];
      for (let parentIndex = 0; parentIndex < NUMBER_OF_PARENT_KEYS; parentIndex++) {
        parentKeysDuplicateCheckResults.push(blueprintForCreatingJSON[index2].parents[parentIndex] === DUPLICATE_CHECK_TARGET.parents[parentIndex]);
      }
      if (parentKeysDuplicateCheckResults.indexOf(false) !== -1) continue;
      IS_MAIN_KEY_DUPLICATED = blueprintForCreatingJSON[index2].keyAndValue.key === DUPLICATE_CHECK_TARGET.keyAndValue.key;
      if (IS_MAIN_KEY_DUPLICATED) {
        DUPLICATED_KEY = blueprintForCreatingJSON[index2].keyAndValue.key;
        break;
      }
    }
    if (IS_MAIN_KEY_DUPLICATED) break;
  }
  return {
    isDuplicated: IS_MAIN_KEY_DUPLICATED,
    duplicatedKey: DUPLICATED_KEY
  };
}

function checkNumberOfKeysAndValues (blueprintForCreatingJSON) {
  let keys = [];
  let values = [];
  for (let i = 0; i < blueprintForCreatingJSON.length; i++) {
    if (blueprintForCreatingJSON[i].keyAndValue.key !== null) {
      keys.push(blueprintForCreatingJSON[i].keyAndValue.key);
    }
    if (blueprintForCreatingJSON[i].keyAndValue.value !== null) {
      values.push(blueprintForCreatingJSON[i].keyAndValue.value);
    }
  }
  return keys.length === values.length;
}

module.exports = {
  checkKeyDuplicate,
  checkNumberOfKeysAndValues
};