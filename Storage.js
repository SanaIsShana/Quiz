const fs = require("fs");
const path = require("path");

module.exports = class Storage {
  static jsonData;

  static async storeResultToJson(newPerson) {
    let filePath = path.join(__dirname, "data.json");
    let jsonDataFromFile = fs.readFileSync(filePath, "utf-8");
    let data = JSON.parse(jsonDataFromFile);

    if (data.hasOwnProperty("history")) { //Check if there is history object in data.json
      let allResults = data.history;
      const personFound = allResults.some((person) => person.fullName.toUpperCase() === newPerson.fullName.toUpperCase());

      if (personFound) {
        for (let person of allResults) { //Loop and check if there is history of results of the person
    
          if (person.fullName.toUpperCase() === newPerson.fullName.toUpperCase()) {
            let result = newPerson.results[0];
            person.results.push(result);
          } 
        }
      }
      else {
            data.history.push(newPerson);
      }
    }
    else {
      data.history = [];
      data.history.push(newPerson);
    }

    let dataAsJson = JSON.stringify(data);
    fs.writeFileSync(filePath, dataAsJson, "utf-8");
  }

  static async readJsonFile(name) {
    let filePath = path.join(__dirname, "data.json");
    let jsonDataFromFile = fs.readFileSync(filePath, "utf-8");
    let data =  JSON.parse(jsonDataFromFile);
    this.jsonData = data[name];
    return this.jsonData;
  }
};
