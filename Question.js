const promptly = require("promptly");

module.exports = class Question {
  answersFromQuiz = [];
  constructor(settings) {
    Object.assign(this, settings);
  }

  static async create(options) {
    let instance = new Question();
    await instance.askAllQuestions(questions, options);
    return instance;
  }

  async askAllQuestions(options) {
    let optionsToString = "";
    options.map((x) => {
      optionsToString += options.indexOf(x) + 1 + ". " + x.text + "\n";
    });

    let i = 1;
    const validator = function (value) {
      let list = [1, 2, 3, 4];
      if (!list.includes(+value)) {
        throw new Error("Fel inmatning!");
      }

      return value;
    };

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
