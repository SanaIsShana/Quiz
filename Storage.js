const fs = require("fs");
const path = require("path");

module.exports = class Storage {
  static dataFromJson;

  static async storeResultToJson(newPerson) {
    let filePath = path.join(__dirname, "data.json");
    let jsonDataFromFile = fs.readFileSync(filePath, "utf-8");
    let data = JSON.parse(jsonDataFromFile);

    if (data.hasOwnProperty("results")) { //Check if there is results object in data.json
      let allResults = data.results;
      
      allResults.forEach((x) => { //Loop and check if there is history of results of the person
        if (x.fullName.toUpperCase() == newPerson.fullName.toUpperCase()) {
          x.results.push(newPerson.results[0]);
        }
        
        else { 
           data.results.push(newPerson);
        }
      })
    }
    
    else {
      data.results = [];
      data.results.push(newPerson);
    }

    let dataAsJson = JSON.stringify(data);
    fs.writeFileSync(filePath, dataAsJson, "utf-8");
  }

  static async readJsonFile() {
    let filePath = path.join(__dirname, "data.json");
    let jsonDataFromFile = fs.readFileSync(filePath, "utf-8");
    this.dataFromJson = JSON.parse(jsonDataFromFile);
    return this.dataFromJson;
  }
};
