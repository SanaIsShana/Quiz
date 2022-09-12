const promptly = require("promptly");

module.exports = class Person {
  results = [];
  constructor(fullName) {
    this.fullName = fullName;
  }

  static async create(name) {
    let instance = new Person(name);
    return instance;
  }

  async storeMyResult(result) { 
    this.results.push(result);
  }

  async showResultHistory(dataFromJson) {
    let historyResults = dataFromJson.results;
  
    if (historyResults == undefined) {
      console.log("Tyvär! Det finns ingen historik!");
    }

    if (historyResults.length > 0) {
      for (let history of historyResults) {
        if (this.fullName.toUpperCase() == history.fullName.toUpperCase()) {
          console.log( this.fullName + "s historik: ");
          for (let result of history.results) {
            console.log("\nTid: " + result.time + "\n");
            for (let partyScore of result.match) {
              console.log(partyScore);
            }
          }
        }
      }
    }

    if (historyResults.length == 0) {
      console.log("Tyvär! Det finns ingen historik!");
    }
  }
};
