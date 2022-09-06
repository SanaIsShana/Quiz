const Menu = require("./Menu");
const Person = require("./Person");
const Quiz = require("./Quiz");
const Result = require("./Result");
const data = require("./data.json");

const fs = require("fs");
const path = require("path");

let { questions, options, points } = data;

// function storeAsJsonFile(filename, data) {
//   let filePath = path.join(__dirname, filename);
//   console.log(filePath);
//   let dataAsJson = JSON.stringify(data, null, "  ");
//   fs.writeFileSync(filePath, dataAsJson, "utf-8");
// }

// function readJsonFile(filename) {
//   let filePath = path.join(__dirname, filename);
//   let jsonDataFromFile = fs.readFileSync(filePath, "utf-8");
//   let data = JSON.parse(jsonDataFromFile);
//   return data;
// }

// // let someData = [{ name: "Kalle" }, { name: "Olle" }];
// // storeAsJsonFile("myData.json", someData);
// let someDataFromFile = readJsonFile("myData.json");
// console.log(someDataFromFile[1].name);

async function start() {
  let quizMenu = await Menu.create();
  await startANewQuiz(quizMenu);
}

async function startANewQuiz(quizMenu) {
  if (quizMenu.menuOption == 1) {
    let aNewPerson = await Person.create();
    let aNewQuiz = await Quiz.create(questions, options);
    let aNewResult = await Result.create(aNewPerson.name, aNewQuiz.answers);
    await Menu.create();
  }
  if (quizMenu.menuOption == 2) {
    return "There will be history!";
  }
}

start();
