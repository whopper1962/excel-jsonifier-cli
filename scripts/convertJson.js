const questions = require('../lib/interface');
const fileSystem = require('fs');

getData();

async function getData () {
  const jsonFiles = fileSystem.readdirSync(`${process.cwd()}/json/`);
  const filteredJsonFileNames = jsonFiles.filter((name) => {
    return name !== '.gitkeep';
  });
  const result = await questions.userInfoJsonSelecter(filteredJsonFileNames);
  console.log(result.selectedJson);
}