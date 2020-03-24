const express = require("express");
const router = express.Router();

// OFFER MODEL
const Offer = require("../../models/offer");

// @route   GET api/offers
// @desc    Get all offers
router.get("/", (req, res) => {
	Offer.find().then(offers => {
		res.json(offers);
	});
});

// @route   POST api/offers
// @desc    Create an offer
router.post("/", (req, res) => {
	const {
		creator,
		cost,
		type,
		expiresDate,
		description,
		title,
		isTradeable
	} = req.body;

	if (!creator || !cost || !type || !expiresDate || !description || !title) {
		return res.status(400).json({ msg: "Required information missing" });
	}

	const newOffer = new Offer({
		creator,
		cost,
		type,
		expiresDate,
		description,
		title,
		isTradeable
	});

	newOffer.save().then(offer => {
		res.json(offer);
	});
});

module.exports = router;
