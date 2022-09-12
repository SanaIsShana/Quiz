module.exports = class Result {
  constructor(person, match) {
    this.person = person;
    this.match = match;
    let today = new Date();
    this.time = today.toLocaleDateString() + " " + today.toLocaleTimeString();
  }

  static async create(person, match) {
    let instance = new Result(person, match);
    await instance.showResult();
    return instance;
  }

  async showResult() {
    console.log("Namn: " + this.person + ", Time: " + this.time);

    this.match.forEach((value) => {
      console.log(value);
    });
  }

  static async showResultHistory(person, dataFromJson) {
    let allResults = dataFromJson.results;
    let allHistoryResults = [];

    if (allResults == undefined) {
      console.log("Tyvär! Det finns ingen historik!");
    }

    if (allResults.length > 0) {
      for (let result of allResults) {
        if (person.toUpperCase() == result.name.toUpperCase()) {
          allHistoryResults.push(result);
        }
      }

      console.log("Din historik: ");
      for (let result of allHistoryResults) {
        console.log("\nNamn: " + result.name + "\nTid: " + result.time + "\n");
        for (let partyScore of result.match) {
          console.log(partyScore);
        }
      }
    }

    if (allResults.length == 0 || allHistoryResults.length == 0) {
      console.log("Tyvär! Det finns ingen historik!");
    }
  }
};
