const config = require('./db');
var connection= config.connection

connection.query ('select * from Product', function(error, results){
    if (results){
        console.log(results);
    }
    else{
        console.log(error);
    }
});







