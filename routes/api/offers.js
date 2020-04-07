const express = require("express");
const router = express.Router();

// OFFER MODEL
const Offer = require("../../models/offer");

// @route   GET api/offers
// @desc    Get all offers / one offer
router.get("/", (req, res) => {
	// Check whether theres id
	if (req.headers.id) {
		Offer.findOne({ _id: req.headers.id })
			.then((offer) => {
				res.json(offer);
			})
			.catch((err) => res.send(err));
	} else {
		Offer.find().then((offers) => {
			res.json(offers.reverse());
		});
	}
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
		duration,
		title,
		isTradeable,
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
		duration,
		title,
		isTradeable,
	});

	newOffer.save().then((offer) => {
		res.json(offer);
	});
});

// @route	PUT api/offers
// @desc	Modify an offer
router.put("/", (req, res) => {
	const buyer = req.body;
	Offer.updateOne(
		{ _id: req.headers.id },
		{ $set: { buyer, isActive: true } }
	)
		.then((response) => res.send(response))
		.catch((err) => res.send(err));
});

module.exports = router;
