const promptly = require("promptly");

module.exports = class Quiz {
  constructor(person, questions, options) {
    this.questions = questions;
    this.options = options;
    this.personAnswers = [];
    this.person = person;
  }

  static async create(person, jsonData) {
    let instance = new Quiz(person, jsonData.questions, jsonData.options);
    await instance.askAllQuestions();
    return instance;
  }

  async askAllQuestions() {
    let optionsToString = "";
    let i = 1;
    let answers = [];

    for (let option of this.options) { 
      optionsToString += this.options.indexOf(option) + 1 + ". " + option.text + "\n";
    }

    const validator = function (value) {
      let list = [1, 2, 3, 4];
      if (!list.includes(+value)) {
        throw new Error("Fel inmatning!");
      }

      return value;
    };

    console.log("Hej " + this.person.fullName + ", det finns 30 frågor att besvara. \n");
    for (let question of this.questions) {
      const answer = await promptly.prompt(
        i + ". " + question.text + "\n" + optionsToString + "\nVälj: ",
        { validator }
      );
      i++;
      console.clear();
      answers.push(answer);
    }
    await this.converAnswersToPoints(answers);
  }

  async converAnswersToPoints(answers) {
    for (let answer of answers) {
      for (let option of this.options) {
        if (answer == option.number) {
          this.personAnswers.push(option.value);
        }
      }
    }
  }
};
