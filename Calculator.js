module.exports = class Calculator {
  static convertedAnswers = [];

  static async checkResult(personAnswers, quiz) {
    let { questions } = quiz;

    let oneQuestionPoints = {};
    let allQuestionsPointsList = [];

    let i = 0;

    //Points with name of every party as key for each question
    for (let question of questions) {
      oneQuestionPoints = {};
      for (const [key, value] of Object.entries(question.points)) {
        oneQuestionPoints[key] = 4 - Math.abs(value - personAnswers[i]);
      }
      i++;
      allQuestionsPointsList.push(oneQuestionPoints);
    }
    await Calculator.getTotalPoints(allQuestionsPointsList);
  }

  static async getTotalPoints(allQuestionsPointsList) {
    let totalPointsList = {
      V: 0,
      S: 0,
      MP: 0,
      C: 0,
      L: 0,
      KD: 0,
      M: 0,
      SD: 0,
    };

    // Get the total amount of the points
    for (const [key, value] of Object.entries(allQuestionsPointsList)) {
      Object.keys(totalPointsList).forEach((keyTotalPoints) => {
        totalPointsList[keyTotalPoints] += value[keyTotalPoints];
      });
    }
    await Calculator.calulatePercentage(totalPointsList);
  }

  static async calulatePercentage(totalPointsList) {
    Calculator.convertedAnswers = [];
    // Convert and store the points in array
    Object.keys(totalPointsList).forEach((key) => {
      totalPointsList[key] = Math.round(totalPointsList[key] / 1.2);

      switch (key) {
        case "V":
          Calculator.convertedAnswers.push(
            "Vänsterpartiet: " + totalPointsList[key] + "%"
          );
          break;
        case "S":
          Calculator.convertedAnswers.push(
            "Socialdemokraterna: " + totalPointsList[key] + "%"
          );
          break;
        case "MP":
          Calculator.convertedAnswers.push(
            "Miljöpartiet: " + totalPointsList[key] + "%"
          );
          break;
        case "C":
          Calculator.convertedAnswers.push(
            "Centerpartiet: " + totalPointsList[key] + "%"
          );
          break;
        case "L":
          Calculator.convertedAnswers.push(
            "Liberalerna: " + totalPointsList[key] + "%"
          );
          break;
        case "KD":
          Calculator.convertedAnswers.push(
            "Kristdemokraterna: " + totalPointsList[key] + "%"
          );
          break;
        case "M":
          Calculator.convertedAnswers.push(
            "Moderaterna: " + totalPointsList[key] + "%"
          );
          break;
        case "SD":
          Calculator.convertedAnswers.push(
            "Sverigedemokraterna: " + totalPointsList[key] + "%"
          );
      }
    });

    Calculator.convertedAnswers.sort(
      (a, b) => b.slice(-3, -1) - a.slice(-3, -1)
    );
    return Calculator.convertedAnswers;
  }
};
