const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		unique: true,
		required: true,
	},
	profile_picture: {
		type: String,
		required: false,
	},
	hive_id: {
		type: Number,
		required: false,
	},
	karma: {
		type: Number,
		default: 100,
	},
	money: {
		type: Number,
		default: 50,
	},
	password: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = User = mongoose.model("user", UserSchema);
