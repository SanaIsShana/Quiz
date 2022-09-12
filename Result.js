module.exports = class Result {
  constructor(match) {
    this.match = match;
    let today = new Date();
    this.time = today.toLocaleDateString() + " " + today.toLocaleTimeString();
  }

  static async create(person, match) {
    let instance = new Result(match);
    await instance.showNewResult(person);
    return instance;
  }

  async showNewResult(person) {
    console.log("Namn: " + person.fullName + ", Time: " + this.time);

    this.match.forEach((value) => {
      console.log(value);
    });
  }
};
