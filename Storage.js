const fs = require("fs");
const path = require("path");

module.exports = class Storage {
  static jsonData;

  static async storeResultToJson(newPerson) {
    let filePath = path.join(__dirname, "data.json");
    let jsonDataFromFile = fs.readFileSync(filePath, "utf-8");
    let data = JSON.parse(jsonDataFromFile);

    if (data.hasOwnProperty("history")) { //Check if there is results object in data.json
      let allResults = data.history;
      
      allResults.forEach((x) => { //Loop and check if there is history of results of the person
        if (x.fullName.toUpperCase() == newPerson.fullName.toUpperCase()) {
          x.results.push(newPerson.results[0]);
        }
        
        else { 
           data.history.push(newPerson);
        }
      })
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
