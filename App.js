const Person = require("./Person");
const Result = require("./Result");
const Storage = require("./Storage");
const Quiz = require("./Quiz");
const Menu = require("./Menu");
const Calculator = require("./Calculator");
const data = require("./data-copy.json");

let { questions, options } = data;

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
      let quiz = await Quiz.create(questions, options);

      let resultCalculator = await Calculator.create(
        //also can change Calculator static method here instead of declaing a new Object
        quiz.answersFromQuiz,
        questions
      );

      await Storage.storeResultToJson(
        newPlayer.fullName,
        resultCalculator.quizResult
      );
      let resultsFromJson = await Storage.readJsonFile();
      await Result.showResult(resultsFromJson["results"]);

      await this.nextTurn();
    }

    if (quizMenu.menuOption == 2) {
      let playerForHistory = await Person.create(); //To do, maybe can change the static methods?
      let resultsFromJson = await Storage.readJsonFile();
      await Result.showResultHistory(
        playerForHistory.fullName,
        resultsFromJson["results"]
      );
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
