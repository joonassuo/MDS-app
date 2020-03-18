const express = require("express");
const router = express.Router();

// USER MODEL
const User = require("../../models/user");

// @route   GET api/users
// @desc    Get all users
router.get("/", (req, res) => {
	User.find().then(users => {
		res.json(users);
	});
});

// @route   POST api/users
// @desc    Create a user
router.post("/", (req, res) => {
	const newUser = new User({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		username: req.body.username
	});

	newUser.save().then(user => res.json(user));
});

module.exports = router;
