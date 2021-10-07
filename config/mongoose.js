//require library
const mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://localhost/codial_development');

//acquire the connection (if is successfull)
const db = mongoose.connection;

//error
db.on('err', console.error.bind(console, 'error connecting to db'));

//up and running then print the message
db.once('open', function(){
    console.log('successfully connected to databse')
});

module.exports = db;