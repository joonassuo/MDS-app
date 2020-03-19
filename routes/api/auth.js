const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const User = require("../../models/user");

// @route   POST api/auth
// @desc    Auth user
// @access	Public
router.post("/", (req, res) => {
	const { password, email } = req.body;

	// Validation
	if (!password || !email) {
		return res.status(400).json({ msg: "Please enter all fields" });
	}

	// Check for existing user
	User.findOne({ email }).then(user => {
		if (!user)
			return res
				.status(400)
				.json({ msg: "User with given email does not exists" });

		// Validate password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (!isMatch)
				return res.status(400).json({ msg: "Invalid credentials" });

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

// @route	GET api/auth/user
// @desc	Get user data
// @access	Private
router.get("/user", auth, (req, res) => {
	User.findById(req.user.id)
		.select("-password")
		.then(user => res.json(user));
});

module.exports = router;
