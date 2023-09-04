const mongoose = require('mongoose');

<<<<<<< HEAD
mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');
=======
mongoose.connect('mongodb://localhost/codeial_development');
>>>>>>> 73b231f7c64fc8a096c073b8f550afad12b39145

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;