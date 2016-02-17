const FILEPATH = './data/data.json';

var fs = require('fs');
var Position;

// Create collection, clear out any old entities
exports.initModel = function (db) {
    Position = db.collection('Position');
    exports.Position = Position;
    Position.createIndex({title: "text"});
    Position.remove();

};

// Import the data from our local file to our local database
exports.importData = function () {

    var employeeData = JSON.parse(fs.readFileSync(FILEPATH, 'utf8'));
    employeeData.data.forEach(function (employee) {
        title = employee[9];
        totalEarnings = employee[18];

        Position.insert({ title: title, totalEarnings: totalEarnings}, function (err, result) {
            if (err) {
                console.log(err);
            }
        });
    });
};
