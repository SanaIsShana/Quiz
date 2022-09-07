const fs = require("fs");
const path = require("path");

module.exports = class History {
  constructor(h) {
    this.h = h;
  }
  static async create() {
    let instance = new History();
    await instance.showMenu();
    return instance;
  }

  static async getAllHistory(fullName, allResults) {
    let allHistory = [];
    for (let result of allResults) {
      if (result.result.name == fullName) {
        allHistory.push(result.result.time + result.result.match);
      }
    }
  }
};
