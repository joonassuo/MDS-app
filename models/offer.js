const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema({
	creator: {
		type: Object,
		required: true
	},
	buyer: {
		type: Object,
		required: false
	},
	cost: {
		type: Number,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	createdDate: {
		type: Date,
		default: Date.now
	},
	expiresDate: {
		type: Date,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	title: {
		type: String,
		required: true
	},
	isActive: {
		type: Boolean,
		default: false
	},
	isCompleted: {
		type: Boolean,
		default: false
	},
	isTradeable: {
		type: Boolean,
		required: false
	}
});

module.exports = Offer = mongoose.model("offer", offerSchema);
