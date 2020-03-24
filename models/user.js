const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	username: {
		type: String,
		unique: true,
		required: true
	},
	profilePic: {
		type: Image,
		required: false
	},
	karma: {
		type: Number,
		default: 100
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model("user", UserSchema);
