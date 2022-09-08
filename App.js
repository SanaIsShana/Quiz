const data = require("./data-copy.json");
const Person = require("./Person");
const Result = require("./Result");
const Storage = require("./Storage");
const Question = require("./Question");
const Menu = require("./Menu");
const Calculator = require("./Calculator");

// Parsing json into class instance
// (Refactor into utility class later?)
let { questions, options, results } = data;
listOfQuestions = reInstantiate(Question, questions);
results = reInstantiate(Result, results);

function reInstantiate(_class, arrayOfObjects) {
  return arrayOfObjects.map((object) => new _class(object));
}

module.exports = class App {
  static async create() {
    let instance = new App();
    await instance.start();
    return instance;
  }

  async start() {
    let quizMenu = await Menu.start();
    if (quizMenu.menuOption == 1) {
      let newPlayer = await Person.create();
      let quiz = await Question.create(questions, options);
      let resultCalculator = await Calculator.create(
        quiz.answersFromQuiz,
        questions
      );

      await Storage.storeResultToJson(
        newPlayer.fullName,
        resultCalculator.quizResult
      );

      await results[results.length - 1].showResult();

      await this.nextTurn();
    }
    if (quizMenu.menuOption == 2) {
      let playerForHistory = await Person.create();
      await Result.showResultHistory(playerForHistory.fullName, results);
      await this.nextTurn();
    }
    if (quizMenu.menuOption == 3) {
      process.exit();
    }
  }
  async nextTurn() {
    await this.start();
  }
};
