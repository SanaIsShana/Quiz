const Person = require("./Person");
const Result = require("./Result");
const Storage = require("./Storage");
const Quiz = require("./Quiz");
const Menu = require("./Menu");
const Calculator = require("./Calculator");

module.exports = class App {
  static async start() {
    await Menu.askMenuOption();

    if (Menu.menuOption == 1) {
      await Menu.askName();
      let newPerson = await Person.create(Menu.personName);

      await Storage.readJsonFile("quiz");
      let quiz = await Quiz.create(newPerson, Storage.jsonData);

      await Calculator.checkResult(quiz.personAnswers, quiz);

      let newResult = await Result.create(
        newPerson, Calculator.convertedAnswers
      );

      newPerson.storeMyResult(newResult);

      await Storage.storeResultToJson(newPerson);

      await App.nextTurn();
    }

    if (Menu.menuOption == 2) {

      await Menu.askName();
      let personForHistory = await Person.create(Menu.personName);
      
      await Storage.readJsonFile("history");
      await personForHistory.showResultHistory(Storage.jsonData);
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
