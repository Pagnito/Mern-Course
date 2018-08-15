const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const app = express();
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const PORT = process.env.PORT || 5000;
mongoose
	.connect(
		keys.mongoURI,
		{ useNewUrlParser: true }
	)
	.then(() => console.log(" Connected To Mongo"))
	.catch((err) => console.log(err));

app.get("/", (req, res) => {
	res.send("hello World");
});
/*
require("./routes/api/users")(app);
require("./routes/api/profile")(app);
require("./routes/api/posts")(app);
*/
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
