const Person = require("./Person");
const Result = require("./Result");
const Storage = require("./Storage");
const Quiz = require("./Quiz");
const Menu = require("./Menu");
const Calculator = require("./Calculator");

module.exports = class App {
  static async start() {
    await Menu.askMenuOption();
    await Storage.readJsonFile();

    if (Menu.menuOption == 1) {
      let newPerson = await Person.create();
      let quiz = await Quiz.create(newPerson.fullName, Storage.dataFromJson);

      await Calculator.checkResult(quiz.answersFromQuiz, Storage.dataFromJson);
      let newResult = await Result.create(
        newPerson.fullName,
        Calculator.answersInPercentage
      );

      await Storage.storeResultToJson(newResult);

      await Storage.readJsonFile();

      await App.nextTurn();
    }

    if (Menu.menuOption == 2) {
      let personForHistory = await Person.create();
      await Storage.readJsonFile();

      await Result.showResultHistory(
        personForHistory.fullName,
        Storage.dataFromJson
      );
      await App.nextTurn();
    }

    if (Menu.menuOption == 3) {
      console.log(
        "\nDet är tråkigt att du vill lämna valkompassen, hoppas att vi ses nästa riksdagsval!"
      );
      process.exit();
    }
  }

  static async nextTurn() {
    await App.start();
  }
};
