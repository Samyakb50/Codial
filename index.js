const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')
const cookieParser = require('cookie-parser')

app.use(expressLayouts);
app.use('/', require('./routes/index'));
app.use(express.static('./assets'));
app.use(express.urlencoded());
app.use(cookieParser())

app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

app.set('view engine', 'ejs');
app.set('views', './views');



app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err}`);
    }
    console.log(`Server is running on port: ${port}`)
})