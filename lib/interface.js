const INQUIRER = require('inquirer');

module.exports = {
  async userInfoFileSelecter (excelFiles = []) {
    let questions = [
      {
        type: 'list',
        name: 'selectedFile',
        message: 'ファイルを選択してください',
        choices: excelFiles
      }
    ];
    return INQUIRER.prompt(questions);
  },
  async userInfoNumberOfParentKeySelecter (columns = []) {
    let questions = [
      {
        type: 'list',
        name: 'selectedNumberOfParentKeys',
        message: 'JSONの親キーの数を選択してください',
        choices: columns
      }
    ];
    return INQUIRER.prompt(questions);
  },
  async userInfoParentKeyColumnSelecter (columns = [], count) {
    let questions = [
      {
        type: 'list',
        name: 'selectedParentKeyColumn',
        message: `${count}番目に大きいJSONの親キーカラムを選択してください`,
        choices: columns
      }
    ];
    return INQUIRER.prompt(questions);
  },
  async userInfoKeyColumnSelecter (columns = []) {
    let questions = [
      {
        type: 'list',
        name: 'selectedKeyColumn',
        message: 'JSONのキーに指定するカラムを指定してください',
        choices: columns
      }
    ];
    return INQUIRER.prompt(questions);
  },
  async userInfoJSONFileName () {
    let questions = [
      {
        type: 'input',
        name: 'selectedJSONFileName',
        validate: function (input) {
          if (input.length === 0) {
            return 'ファイル名は必須項目です。入力してください';
          } else {
            return true;
          }
        },
        message: '作成するJSONファイル名を入力してください（.json）'
      }
    ];
    return INQUIRER.prompt(questions);
  },
  async userInfoValueColumnSelecter (columns = []) {
    let questions = [
      {
        type: 'list',
        name: 'selectedValueColumn',
        message: 'JSONのバリューに指定するカラムを指定してください',
        choices: columns
      }
    ];
    return INQUIRER.prompt(questions);
  },
  async isParentKeysSelecterNeeded () {
    let questions = [
      {
        type: 'list',
        name: 'isParentKeysSelecterNeeded',
        message: 'キーの階層は2つ以上ですか？',
        choices: [
          'NO',
          'YES'
        ]
      }
    ];
    return INQUIRER.prompt(questions);
  },
  async userInfoConfirmation () {
    let questions = [
      {
        type: 'list',
        name: 'confirmed',
        message: '以上の内容でJSONを作成します。よろしいですか？',
        choices: [
          'YES',
          'NO'
        ]
      }
    ];
    return INQUIRER.prompt(questions);
  },
  async userInfoSheetSelecter (sheets) {
    let questions = [
      {
        type: 'list',
        name: 'selectedSheetName',
        message: 'シートを選択してください',
        choices: sheets
      }
    ];
    return INQUIRER.prompt(questions);
  },
  async isDeleteFlagNeeded () {
    let questions = [
      {
        type: 'list',
        name: 'isDeleteFlagNeeded',
        message: '削除フラグを使用しますか？',
        choices: [
          'NO',
          'YES'
        ]
      }
    ];
    return INQUIRER.prompt(questions);
  },
  async getDeleteFlagColumn (columns = []) {
    let questions = [
      {
        type: 'list',
        name: 'selectedDeleteColumn',
        message: '削除フラグとして使用するカラムを選択してください。',
        choices: columns
      }
    ];
    return INQUIRER.prompt(questions);
  },
  async getMinRange (minNumber, maxNumber) {
    let questions = [
      {
        type: 'input',
        name: 'selectedMinRange',
        message: `${minNumber}から${maxNumber}の間でデータの始点を指定してください。`,
        validate: function (input) {
          if (input < minNumber || input > maxNumber) {
            return `${minNumber}から${maxNumber}の間の数字を入力してください`;
          } else if (input === maxNumber) {
            return ``;
          } else {
            return true;
          }
        }
      }
    ];
    return INQUIRER.prompt(questions);
  },
  async getMaxRange (minNumber, maxNumber) {
    let questions = [
      {
        type: 'input',
        name: 'selectedMaxRange',
        message: `${minNumber}から${maxNumber}の間でデータの終点を指定してください。`,
        validate: function (input) {
          if (input < minNumber || input > maxNumber) {
            return `${minNumber}から${maxNumber}の間の数字を入力してください`;
          } else if (input === maxNumber) {
            return ``;
          } else {
            return true;
          }
        }
      }
    ];
    return INQUIRER.prompt(questions);
  },
  async getBlankInfo () {},
  async getEolValue () {
    let questions = [
      {
        type: 'list',
        name: 'selectedEolValue',
        message: '改行がある場合に代用する文字列を選択してください',
        choices: [
          '改行コード',
          '<br>',
          '削除',
          'その他文字列'
        ]
      }
    ];
    return INQUIRER.prompt(questions);
  },
  async getAnotherEolValue () {
    let questions = [
      {
        type: 'input',
        name: 'inputedAnotherEolValue',
        validate: function (input) {
          if (input.length === 0) {
            return '改行がある場合に代用する文字列は必須項目です。入力してください';
          } else {
            return true;
          }
        },
        message: '改行がある場合に代用する文字列を入力してください'
      }
    ];
    return INQUIRER.prompt(questions);
  },
};