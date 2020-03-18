const express = require("express");
const mongoose = require("mongoose");
//const path = require("path");
//const cors = require("cors");

require("dotenv").config();

const users = require("./routes/api/users");
const app = express();

//app.use(cors());
app.use(express.json());
//app.use(express.static(path.join(__dirname, "client", "build")));

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB connection established successfully!");
});

/*
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
*/

// ROUTES
app.use("/api/users", users);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
