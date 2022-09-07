const fs = require("fs");
const path = require("path");

module.exports = class History {
  constructor(settings) {
    Object.assign(this, settings);
  }
  static async create() {
    let instance = new History();
    await instance.showMenu();
    return instance;
  }

  async getAllHistory() {}
};
