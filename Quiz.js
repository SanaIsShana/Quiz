const promptly = require("promptly");

module.exports = class Quiz {
  constructor(person) {
    this.answersFromQuiz = [];
    this.person = person;
  }

  static async create(person, jsonData) {
    let instance = new Quiz();
    let questions = jsonData.questions;
    let options = jsonData.options;
    await instance.askAllQuestions(person, questions, options);
    return instance;
  }

  async askAllQuestions(person, questions, options) {
    let optionsToString = "";
    let i = 1;

    options.map((x) => {
      optionsToString += options.indexOf(x) + 1 + ". " + x.text + "\n";
    });

    const validator = function (value) {
      let list = [1, 2, 3, 4];
      if (!list.includes(+value)) {
        throw new Error("Fel inmatning!");
      }

      return value;
    };

    console.log("Hej " + person + ", det finns 30 frågor att besvara. \n");
    for (let question of questions) {
      const answer = await promptly.prompt(
        i + ". " + question.text + "\n" + optionsToString + "\nVälj: ",
        { validator }
      );
      i++;
      console.clear();
      this.answersFromQuiz.push(answer);
    }
  }
};
