import React, { useState } from "react";
import { addOffer } from "../actions/offerActions";
import { useDispatch, useSelector } from "react-redux";

const AddOffer = () => {
	const [title, setTitle] = useState("");
	const [cost, setCost] = useState(0);
	const [duration, setDuration] = useState(30);
	const [description, setDescription] = useState("");
	const [type, setType] = useState("lesson");
	const [isTradeable, setIsTradeable] = useState(false);
	const [isDetails, setIsDetails] = useState(true);
	const [isDesc, setIsDesc] = useState(false);
	const [isSummary, setIsSummary] = useState(false);
	const user = useSelector(state => state.auth.user);
	const dispatch = useDispatch();

	const dur = type => {
		const sign = type === "increase" ? 1 : -1;
		if (sign < 0 && duration > 15) {
			setDuration(duration - 15);
		} else if (sign > 0 && duration < 240) {
			setDuration(duration + 15);
		}
	};

	const durationValue = duration => {
		const hours = Math.floor(duration / 60);
		const minutes = duration % 60;
		return hours + " : " + minutes + (minutes < 10 ? "0" : "");
	};

	const onChange = (e, type) => {
		switch (type) {
			case "type":
				setType(e.target.value);
				break;
			case "cost":
				setCost(e.target.value);
				break;
			case "isTradeable":
				setIsTradeable(e.target.value === "on" ? true : false);
				break;
			case "title":
				setTitle(e.target.value);
				break;
			case "description":
				setDescription(e.target.value);
				break;
			default:
				return;
		}
	};

	const submitOffer = () => {
		// Get current user from state
		const creator = {
			id: user._id,
			username: user.username,
			karma: user.karma
		};

		// Create expires date a week from now
		Date.prototype.addDays = function(days) {
			var date = new Date(this.valueOf());
			date.setDate(date.getDate() + days);
			return date;
		};
		var date = new Date();
		const expiresDate = date.addDays(7);

		const offer = {
			creator,
			cost,
			type,
			expiresDate,
			description,
			duration,
			title,
			isTradeable
		};
		console.log(offer);

		addOffer(offer)(dispatch);
	};

	return (
		<div>
			{isDetails ? (
				<div>
					<h1 className="header">DETAILS</h1>
					<select
						name="type"
						id="type-dropdown"
						defaultValue="lesson"
						onChange={e => onChange(e, "type")}
					>
						<option value="lesson">Lesson</option>
						<option value="rent">Rent</option>
						<option value="sell">Sell</option>
					</select>
					<div className="input-duration">
						<button
							id="duration-minus"
							onClick={() => dur("decrease")}
						>
							-
						</button>
						<h3>{durationValue(duration)}</h3>
						<button
							id="duration-plus"
							onClick={() => dur("increase")}
						>
							+
						</button>
					</div>
					<input
						type="number"
						name="cost"
						id="cost-field"
						placeholder="price"
						onChange={e => onChange(e, "cost")}
					/>
					<label htmlFor="isTradeable">Allow Trade Offers?</label>
					<input
						type="checkbox"
						name="isTradeable"
						id="is-tradeable-box"
						onChange={e => onChange(e, "isTradeable")}
					/>
					<button
						className="next-button"
						onClick={() => {
							setIsDetails(false);
							setIsDesc(true);
						}}
					>
						->
					</button>
				</div>
			) : isDesc ? (
				<div>
					<h1 className="header">DESCRIPTION</h1>
					<input
						type="text"
						placeholder="TITLE"
						id="title-field"
						onChange={e => onChange(e, "title")}
					/>
					<input
						type="text"
						placeholder="Give a brief but exhaustive description about your offering"
						id="description-field"
						onChange={e => onChange(e, "description")}
					/>
					<button
						className="next-button"
						onClick={() => {
							setIsSummary(true);
							setIsDesc(false);
						}}
					>
						->
					</button>
				</div>
			) : isSummary ? (
				<div>
					<h1 className="header">Review Offer</h1>
					<h2 id="summary-title">{title}</h2>
					<h3 id="summary-type">{type}</h3>
					<h4 id="summary-duration">{duration}</h4>
					<h4 id="summary-cost">{cost}</h4>
					<h4 id="summary-tradeable">{isTradeable}</h4>
					<h4 id="summary-description">{description}</h4>
					<button id="submit-button" onClick={() => submitOffer()}>
						SUBMIT
					</button>
				</div>
			) : null}
		</div>
	);
};

export default AddOffer;
