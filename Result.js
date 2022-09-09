module.exports = class Result {
  static async showResult(results) {
    let quizResult = results[results.length - 1];
    console.log("Namn: " + quizResult.name + ", Time: " + quizResult.time);
    quizResult.match.forEach((value) => {
      console.log(value);
    });
  }

  static async showResultHistory(person, allResults) {
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
