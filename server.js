const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
var passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
var fs = require('fs');
// var multer = require('multer');


//mongoose.createConnection(config.database);
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
	console.log('connected to database' +config.database);
});

mongoose.connection.on('error', () => {
	console.log('database error ' +err);
});

const app = express();

const users = require('./routes/users');
const stories = require('./routes/story_infos');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/story_infos', stories);

// Index router
app.get('/', (req, res) => {
	res.send('Hello');
});

app.listen(port, () => {
	console.log('Server started on port '+port);
});
