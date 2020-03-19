const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
//const path = require("path");
//const cors = require("cors");

const app = express();
//app.use(cors());
app.use(express.json());
//app.use(express.static(path.join(__dirname, "client", "build")));

// connect to mongodb
const uri = config.get("MONGODB_URI");
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB connection established successfully!");
});

// ROUTES
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

/*
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
*/

// listen on port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
