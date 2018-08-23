const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const app = express();
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const bodyParser = require('body-parser');
require('./models/user-model');
const PORT = process.env.PORT || 5000;
const ip = require('ip');
console.log(ip.address());
mongoose
	.connect(
		keys.mongoURI,
		{ useNewUrlParser: true }
	)
	.then(() => console.log(' Connected To Mongo'))
	.catch((err) => console.log(err));

//////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
require('./config/passport')(passport);
/*
require("./routes/api/users")(app);
require("./routes/api/profile")(app);
require("./routes/api/posts")(app);
*/
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
