const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");

// USER MODEL
const User = require("../../models/user");

// @route   GET api/users
// @desc    Get all users
router.get("/", (req, res) => {
	User.find().then(users => {
		res.json(users);
	});
});

// @route	POST api/users
// @desc	Register new user
router.post("/", (req, res) => {
	const { firstname, lastname, username, password, email } = req.body;

	if (!firstname || !lastname || !username || !password || !email) {
		return res.status(400).json({ msg: "Please enter all fields" });
	}

	User.findOne({ email }).then(user => {
		if (user)
			return res
				.status(400)
				.json({ msg: "User with given email already exists" });

		const newUser = new User({
			firstname,
			lastname,
			username,
			password,
			email
		});

		// Create salt & hash
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save().then(user => {
					jwt.sign(
						{ id: user.id },
						config.get("JWT_SECRET"),
						{ expiresIn: 3600 },
						(err, token) => {
							if (err) throw err;
							res.json({
								token,
								user: {
									id: user.id,
									firstname: user.firstname,
									lastname: user.lastname,
									username: user.username,
									email: user.email
								}
							});
						}
					);
				});
			});
		});
	});
});

module.exports = router;
