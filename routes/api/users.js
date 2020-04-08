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
	User.find().then((users) => {
		res.json(users);
	});
});

// @route	POST api/users/hive
// @desc	Register Hive user
router.post("/hive", (req, res) => {
	const {
		firstname,
		lastname,
		username,
		email,
		profile_picture,
		hive_id,
	} = req.body;

	if (!firstname || !lastname || !username || !email) {
		return res.status(400).json({ msg: "Please enter all fields" });
	}

	User.findOne({ email }).then((user) => {
		if (user)
			return res
				.status(400)
				.json({ msg: "User with given email already exists" });

		const newUser = new User({
			firstname,
			lastname,
			username,
			email,
			profile_picture,
			hive_id,
		});

		newUser.save().then((user) =>
			res.json({
				user,
			})
		);
	});
});

// @route	POST api/users
// @desc	Register new user
router.post("/", (req, res) => {
	const { firstname, lastname, username, password, email } = req.body;

	if (!firstname || !lastname || !username || !password || !email) {
		return res.status(400).json({ msg: "Please enter all fields" });
	}

	User.findOne({ email }).then((user) => {
		if (user)
			return res
				.status(400)
				.json({ msg: "User with given email already exists" });

		const newUser = new User({
			firstname,
			lastname,
			username,
			password,
			email,
		});

		// Create salt & hash
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save().then((user) => {
					jwt.sign(
						{ id: user.id },
						config.get("JWT_SECRET"),
						{ expiresIn: 3600 },
						(err, token) => {
							if (err) throw err;
							res.json({
								token,
								user,
							});
						}
					);
				});
			});
		});
	});
});

// @route	PUT api/users
// @desc	Modify user data

router.put("/", (req, res) => {
	const id = req.headers.id;
	const r = req.body;
	const body = {};

	r.firstname ? (body.firstname = r.firstname) : null;
	r.lastname ? (body.lastname = r.lastname) : null;
	r.username ? (body.username = r.username) : null;
	r.email ? (body.email = r.email) : null;
	r.profile_picture ? (body.profile_picture = r.profile_picture) : null;
	r.karma ? (body.karma = r.karma) : null;
	r.money ? (body.money = r.money) : null;

	// Find user

	User.updateOne(
		{ _id: id },
		{ $set: body, $push: { notifications: r.notification } }
	)
		.then((response) => res.send(response))
		.catch((err) => res.send(err));
});

module.exports = router;
