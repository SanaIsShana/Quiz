const promptly = require("promptly");

module.exports = class Person {
  fullName = " ";
  constructor(settings) {
    Object.assign(this, settings);
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
    const firstName = await promptly.prompt("Förnamn?");
    const lastName = await promptly.prompt("Efternamn?");

    console.clear();

    this.fullName = firstName + " " + lastName;

    console.log("Hej " + this.fullName + "!");
  }
};
