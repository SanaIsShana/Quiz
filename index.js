const Menu = require("./Menu");
const Person = require("./Person");
const Quiz = require("./Quiz");
const Question = require("./Question");
const Result = require("./Result");
const Storage = require("./Storage");
const History = require("./History");
const data = require("./data-copy.json");

let { questions, options, points, results } = data; // How should I use deserialization?
questions = reInstantiate(Question, questions); // Do I need validators for user's input?
options = reInstantiate(Question, options);
listOfResults = reInstantiate(Result, results);

function reInstantiate(_class, arrayOfObjects) {
  return arrayOfObjects.map((object) => new _class(object));
}

async function start() {
  let quizMenu = await Menu.create();
  await startANewTurn(quizMenu);
}

async function startANewTurn(quizMenu) {
  if (quizMenu.menuOption == 1) {
    let aNewPerson = await Person.create();
    let aNewQuiz = await Quiz.create(questions, options);
    let aNewResult = await Result.create(aNewQuiz.answersFromQuiz, points);

    await Storage.storeResultToJson(aNewPerson.fullName, aNewResult.result);
    await Storage.readJsonFile(aNewPerson.fullName);
    await Menu.create();
  }
  if (quizMenu.menuOption == 2) {
    let historyOfPerson = await Person.create();
    await History.getAllHistory(historyOfPerson.fullName, listOfResults);
  }
}

start();
