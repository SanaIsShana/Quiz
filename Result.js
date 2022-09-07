module.exports = class Result {
  results = [];
  allPartyPoint = { V: 0, S: 0, MP: 0, C: 0, L: 0, KD: 0, M: 0, SD: 0 };
  resultInPCT = [];

  constructor(answers) {
    Object.assign(this, answers);
  }

  static async create(answers, points) {
    let instance = new Result(answers);
    await instance.checkResult(answers, points);
    return instance;
  }

  async checkResult(answers, points) {
    for (let answer of answers) {
      switch (answer) {
        case "1":
          this.results.push(2);
          break;
        case "2":
          this.results.push(1);
          break;
        case "3":
          this.results.push(-1);
          break;
        case "4":
          this.results.push(-2);
      }
    }
    for (let point of points) {
      for (let i = 0; i < 8; i++) {
        if (
          point[Object.keys(point)[i]] === this.results[points.indexOf(point)]
        ) {
          this.allPartyPoint[Object.keys(this.allPartyPoint)[i]] += 1;
        }
      }
    }

    await this.convertResult();
  }

  async convertResult() {
    Object.keys(this.allPartyPoint).forEach((key) => {
      this.allPartyPoint[key] = parseInt((this.allPartyPoint[key] / 30) * 100);
      switch (key) {
        case "V":
          this.resultInPCT.push({ Vänsterpartiet: this.allPartyPoint[key] });
          break;
        case "S":
          this.resultInPCT.push({
            Socialdemokraterna: this.allPartyPoint[key],
          });
          break;
        case "MP":
          this.resultInPCT.push({ Miljöpartiet: this.allPartyPoint[key] });
          break;
        case "C":
          this.resultInPCT.push({ Centerpartiet: this.allPartyPoint[key] });
          break;
        case "L":
          this.resultInPCT.push({ Liberalerna: this.allPartyPoint[key] });
          break;
        case "KD":
          this.resultInPCT.push({ Kristdemokraterna: this.allPartyPoint[key] });
          break;
        case "M":
          this.resultInPCT.push({ Moderaterna: this.allPartyPoint[key] });
          break;
        case "SD":
          this.resultInPCT.push({
            Sverigedemokraterna: this.allPartyPoint[key],
          });
      }
    });
  }
};
