var model = require('./model');

// Retreive the average salary for the title matching the provided string
exports.averageSalaryForTitle = function(req, res) {

    // Show webpage if we're in the browser
    if (!req.query.title) {
        res.sendfile('./ui.html');
        return
    }

    var total = 0;
    var count = 0;

    // Find matching positions
    query = req.query.title;
    positions = model.Position.find({$text: {$search: query}});
    stream = positions.stream();

    // Tally up each position
    stream.on("data", function(position){
        count++;
        total += Number(position.totalEarnings);
    });

    // Send response
    stream.on("end", function(){
        res.json({
            query: query,
            matches: count,
            result: "$" + (count? (total / count).toFixed(2) : 0)
        });

    });
};
