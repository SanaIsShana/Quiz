const Person = require("./Person");
const Result = require("./Result");
const Storage = require("./Storage");
const Quiz = require("./Quiz");
const Menu = require("./Menu");
const Calculator = require("./Calculator");
const data = require("./data.json");

let { questions, options } = data;

module.exports = class App {
  static async start() {
    await Menu.askMenuOption();

    if (Menu.menuOption == 1) {
      let newPerson = await Person.create();
      let quiz = await Quiz.create(questions, options);

      let resultCalculator = await Calculator.create(
        quiz.answersFromQuiz,
        questions,
        options
      );

      await Storage.storeResultToJson(
        newPerson.fullName,
        resultCalculator.quizResult
      );

      await Storage.readJsonFile();
      await Result.showResult(Storage.quizResultData["results"]);

      await App.nextTurn();
    }

    if (Menu.menuOption == 2) {
      let personForHistory = await Person.create();
      await Storage.readJsonFile();

      await Result.showResultHistory(
        personForHistory.fullName,
        Storage.quizResultData["results"]
      );
      await App.nextTurn();
    }

    if (Menu.menuOption == 3) {
      console.log(
        "\nDet är tråkigt att du vill lämna valkompassen, hopas att vi ses nästa riksdagsval!"
      );
      process.exit();
    }
  }

  static async nextTurn() {
    await App.start();
  }
};
