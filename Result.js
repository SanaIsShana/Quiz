module.exports = class Result {
  constructor() {
    this.result = [];
  }

  static async create(answers, points) {
    let instance = new Result(answers);
    await instance.checkResult(answers, points);
    return instance;
  }

  async checkResult(answers, points) {
    let convertedAnswers = [];
    let allPartyPoint = { V: 0, S: 0, MP: 0, C: 0, L: 0, KD: 0, M: 0, SD: 0 };
    for (let answer of answers) {
      switch (answer) {
        case "1":
          convertedAnswers.push(2);
          break;
        case "2":
          convertedAnswers.push(1);
          break;
        case "3":
          convertedAnswers.push(-1);
          break;
        case "4":
          convertedAnswers.push(-2);
      }
    }
    for (let point of points) {
      for (let i = 0; i < 8; i++) {
        if (
          point[Object.keys(point)[i]] ===
          convertedAnswers[points.indexOf(point)]
        ) {
          allPartyPoint[Object.keys(allPartyPoint)[i]] += 1;
        }
      }
    }

    await this.convertResult(allPartyPoint);
  }

  async convertResult(allPartyPoint) {
    Object.keys(allPartyPoint).forEach((key) => {
      allPartyPoint[key] = parseInt((allPartyPoint[key] / 30) * 100);
      switch (key) {
        case "V":
          this.result.push("Vänsterpartiet: " + allPartyPoint[key] + "%");
          break;
        case "S":
          this.result.push("Socialdemokraterna: " + allPartyPoint[key] + "%");
          break;
        case "MP":
          this.result.push("Miljöpartiet: " + allPartyPoint[key] + "%");
          break;
        case "C":
          this.result.push("Centerpartiet: " + allPartyPoint[key] + "%");
          break;
        case "L":
          this.result.push("Liberalerna: " + allPartyPoint[key] + "%");
          break;
        case "KD":
          this.result.push("Kristdemokraterna: " + allPartyPoint[key] + "%");
          break;
        case "M":
          this.result.push("Moderaterna: " + allPartyPoint[key] + "%");
          break;
        case "SD":
          this.result.push("Sverigedemokraterna: " + allPartyPoint[key] + "%");
      }
    });
    await this.sortAndShow();
  }
  async sortAndShow() {
    this.result = this.result.sort((a, b) => {
      b.slice(-2) - a.slice(-3, -1);
    });
    this.result.forEach((x) => {
      console.log(x);
    });
  }
  //need to sort and print out the method
};
