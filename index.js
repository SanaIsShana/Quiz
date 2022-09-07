const Menu = require("./Menu");
const Person = require("./Person");
const Quiz = require("./Quiz");
const Result = require("./Result");
const data = require("./data.json");

let { questions, options, points } = data;

async function start() {
  let quizMenu = await Menu.create();
  await startANewQuiz(quizMenu);
}

async function startANewQuiz(quizMenu) {
  if (quizMenu.menuOption == 1) {
    let aNewPerson = await Person.create();
    let aNewQuiz = await Quiz.create(questions, options);
    let aNewResult = await Result.create(
      aNewPerson.name,
      aNewQuiz.answers,
      points
    );
    await Menu.create();
  }
  if (quizMenu.menuOption == 2) {
    return "There will be history!";
  }
}

start();
