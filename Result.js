module.exports = class Result {
  constructor(settings) {
    Object.assign(this, settings);
  }

  static async showResult(results) {
    let quizResult = results[results.length - 1];
    console.log("Namn: " + quizResult.name + ", Time: " + quizResult.time);
    quizResult.match.forEach((value) => {
      console.log(value);
    });
  }

  static async showResultHistory(person, allResults) {
    if (allResults == undefined) {
      console.log("Tyvär! Det finns ingen historik!");
      return;
    }
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
