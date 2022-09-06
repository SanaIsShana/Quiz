const promptly = require("promptly");

module.exports = class Quiz {
  answers = [];

  constructor(questions) {
    Object.assign(this, questions);
  }

  static async create(questions, options) {
    let instance = new Quiz();
    await instance.askAllQuestions(questions, options);
    return instance;
  }

  async askAllQuestions(questions, options) {
    let optionsToString = "";
    options.map((x) => {
      optionsToString += options.indexOf(x) + 1 + ". " + x.text + "\n";
    });

    let i = 1;

    for (let question of questions) {
      const answer = await promptly.prompt(
        i + ". " + question.text + "\n" + optionsToString + "\nVälj: "
      );
      i++;
      console.clear();
      this.answers.push(answer);
    }
  }
};
