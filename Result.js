module.exports = class Result {
  constructor(settings) {
    Object.assign(this, settings);
  }

  async showResult() {
    console.log("Namn: " + this.name + ", Time: " + this.time);
    this.match.forEach((value) => {
      console.log(value);
    });
  }

  static async showResultHistory(person, allResults) {
    let allHistoryResults = [];
    for (let result of allResults) {
      if (person.toUpperCase() == result.name.toUpperCase()) {
        allHistoryResults.push(result);
      }
    }
    for (let result of allHistoryResults) {
      console.log("Namn: " + result.name + "\nTid: " + result.time + "\n");
      for (let partyScore of result.match) {
        console.log(partyScore);
      }
      console.log("\n");
    }
    if (allResults.length == 0 || allHistoryResults.length == 0) {
      console.log("Tyvär! Det finns ingen historik!");
    }
  }
};
