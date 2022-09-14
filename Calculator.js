module.exports = class Calculator {
  static convertedAnswers = [];

  static async checkResult(personAnswers, quiz) {
    let { questions } = quiz;

    let oneQuestionPoints = {};
    let allQuestionsPoints = [];

    let i = 0;

    //Points with name of every party as key for each question
    for (let question of questions) {
      oneQuestionPoints = {};
      for (const [key, value] of Object.entries(question.points)) {
        oneQuestionPoints[key] = 4 - Math.abs(value - personAnswers[i]);
      }
      i++;
      allQuestionsPoints.push(oneQuestionPoints);
    }
    await Calculator.getTotalPoints(allQuestionsPoints);
  }

  static async getTotalPoints(allQuestionsPoints) {
    let totalPoints = {
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
    for (const [key, value] of Object.entries(allQuestionsPoints)) {
      Object.keys(totalPoints).forEach((keyTotalPoints) => {
        totalPoints[keyTotalPoints] += value[keyTotalPoints];
      });
    }
    await Calculator.calulatePercentage(totalPoints);
  }

  static async calulatePercentage(totalPoints) {
    Calculator.convertedAnswers = [];
    // Convert and store the points in array
    Object.keys(totalPoints).forEach((key) => {
      totalPoints[key] = Math.round(totalPoints[key] / 1.2);

      switch (key) {
        case "V":
          Calculator.convertedAnswers.push(
            "Vänsterpartiet: " + totalPoints[key] + "%"
          );
          break;
        case "S":
          Calculator.convertedAnswers.push(
            "Socialdemokraterna: " + totalPoints[key] + "%"
          );
          break;
        case "MP":
          Calculator.convertedAnswers.push(
            "Miljöpartiet: " + totalPoints[key] + "%"
          );
          break;
        case "C":
          Calculator.convertedAnswers.push(
            "Centerpartiet: " + totalPoints[key] + "%"
          );
          break;
        case "L":
          Calculator.convertedAnswers.push(
            "Liberalerna: " + totalPoints[key] + "%"
          );
          break;
        case "KD":
          Calculator.convertedAnswers.push(
            "Kristdemokraterna: " + totalPoints[key] + "%"
          );
          break;
        case "M":
          Calculator.convertedAnswers.push(
            "Moderaterna: " + totalPoints[key] + "%"
          );
          break;
        case "SD":
          Calculator.convertedAnswers.push(
            "Sverigedemokraterna: " + totalPoints[key] + "%"
          );
      }
    });

    Calculator.convertedAnswers.sort(
      (a, b) => b.slice(-3, -1) - a.slice(-3, -1)
    );
    return Calculator.convertedAnswers;
  }
};
