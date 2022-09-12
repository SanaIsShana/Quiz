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

  async showResultHistory(allHistory) {

    if (allHistory == undefined) {
      console.log("Tyvär! Det finns ingen historik!");
    }

    const nameFound = allHistory.some((history) => history.fullName.toUpperCase() === this.fullName.toUpperCase());

    if (nameFound) {
      for (let history of allHistory) {  //Loop through all history and find the person's results
        if (this.fullName.toUpperCase() == history.fullName.toUpperCase()) {
          console.log(this.fullName + "s historik: ");
          for (let result of history.results) {
            console.log("\nTid: " + result.time + "\n");
            for (let partyScore of result.match) {
              console.log(partyScore);
            }
          }
        }
      }
    } else { 
      console.log("Tyvär! Det finns ingen historik!");
    }
  }
};
