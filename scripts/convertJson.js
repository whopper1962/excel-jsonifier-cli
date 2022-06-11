require('colors');
const questions = require('../lib/interface');
const fileSystem = require('fs');
const excelJs = require('exceljs');
const {generateExcelData} = require('../lib/createExcelData');
const generateAlphabet = require('../lib/alphabet');
let workbook = new excelJs.Workbook();
let worksheet = {};
const currentDirectory = process.cwd();
let selectedJsonFile = {};
let parsedJsonData = {}
let excelDataBluePrint = {};
let columnAlphas = [];

main();

async function main () {
  await createSheet();
  await selectJsonFile();
  await readJsonData();
  await createExcelData();
  await createExcel();
  createExcelFile();
}

async function createSheet () {
  const sheetNameResult = await questions.userInfoExcelFileSheetName();
  worksheet = workbook.addWorksheet(sheetNameResult.sheetName);
}

async function selectJsonFile () {
  const jsonFiles = fileSystem.readdirSync(`${currentDirectory}/json-to-conversion/`);
  const filteredJsonFileNames = jsonFiles.filter((name) => {
    return name !== '.gitkeep';
  });
  const result = await questions.userInfoJsonSelecter(filteredJsonFileNames);
  selectedJsonFile = result.selectedJson;
}

async function createExcelFile () {
  try {
    const excelFileNameResult = await questions.userInfoExcelFileName();
    let fileName = excelFileNameResult.excelFileName;
    workbook.xlsx.writeFile(`${fileName}.xlsx`);
    displayMessage('Excelファイル(' + `${fileName}.xlsx`.green + ')が正常に作成されました。');
  } catch (error) {
    console.log(error);
  }
}

async function createExcel () {
  for (let i = 0; i < excelDataBluePrint.routesAndValues.length; i++) {
    for (let routeIndex = 0; routeIndex < excelDataBluePrint.maxParentLength; routeIndex++) {
      worksheet.getCell(`${generateAlphabet(routeIndex + 2)}${i + 1}`).value = excelDataBluePrint.routesAndValues[i].route[routeIndex];
    }
    worksheet.getCell(`${generateAlphabet(1)}${i+1}`).value = excelDataBluePrint.routesAndValues[i].value;
  }
}

async function readJsonData () {
  let json = fileSystem.readFileSync(`${currentDirectory}/json-to-conversion/${selectedJsonFile}`, 'utf-8');
  parsedJsonData = JSON.parse(json);
}

async function createExcelData () {
  excelDataBluePrint = await generateExcelData(parsedJsonData);
}

function displayMessage (message) {
  console.log('\r\n===================================================='.yellow);
  console.log(message);
  console.log('===================================================='.yellow, '\r\n');
}