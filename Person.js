const promptly = require("promptly");

module.exports = class Person {
  constructor(fullName) {
    this.fullName = fullName;
  }
  // This replaces/complements the normal constructor
  // a constructor can not be async, but if we need to create an instance
  // and await something (like askinf for the name)
  // we can add a static create method and use Person.create() instead of
  // new Person()
  static async create() {
    let instance = new Person();
    await instance.askName();
    return instance;
  }

  async askName() {
    const validator = function (value) {
      let regex = new RegExp("^^[a-zA-ZäöåÄÖÅ]+$");
      if (!regex.test(value)) {
        throw new Error("Fel inmatning!");
      }

      return value;
    };

    const firstName = await promptly.prompt("Förnamn?", { validator });
    const lastName = await promptly.prompt("Efternamn?", { validator });

    console.clear();

    this.fullName = firstName + " " + lastName;
  }
};
