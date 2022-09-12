const promptly = require("promptly");

module.exports = class Quiz {
  constructor(person) {
    this.personAnswers = [];
    this.person = person;
  }

  static async create(person, jsonData) {
    let instance = new Quiz();
    await instance.askAllQuestions(person, jsonData);
    return instance;
  }

  async askAllQuestions(person, jsonData) {
    let questions = jsonData.questions;
    let options = jsonData.options;
   
    let optionsToString = "";
    let i = 1;
    let answers = [];

    for (let option of options) { 
      optionsToString += options.indexOf(option) + 1 + ". " + option.text + "\n";
    }

    const validator = function (value) {
      let list = [1, 2, 3, 4];
      if (!list.includes(+value)) {
        throw new Error("Fel inmatning!");
      }

      return value;
    };

    console.log("Hej " + person.fullName + ", det finns 30 frågor att besvara. \n");
    for (let question of questions) {
      const answer = await promptly.prompt(
        i + ". " + question.text + "\n" + optionsToString + "\nVälj: ",
        { validator }
      );
      i++;
      console.clear();
      answers.push(answer);
    }
    await this.converAnswersToPoints(answers, options);
  }

  async converAnswersToPoints(answers, options) {
    for (let answer of answers) {
      for (let option of options) {
        if (answer == option.number) {
          this.personAnswers.push(option.value);
        }
      }
    }
  }
};
