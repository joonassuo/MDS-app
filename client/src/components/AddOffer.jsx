import React, { useState } from "react";
import { addOffer } from "../actions/offerActions";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import "./css/addOffer.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AddOffer = () => {
	const [title, setTitle] = useState("");
	const [cost, setCost] = useState(0);
	const [duration, setDuration] = useState(30);
	const [description, setDescription] = useState("");
	const [type, setType] = useState("");
	const [isTradeable, setIsTradeable] = useState(false);
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
		return hours + ":" + minutes + (minutes < 10 ? "0" : "") + " h";
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
				setIsTradeable(e.target.checked);
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
		<Carousel classname="carousel" interval={null} wrap={false}>
			<Carousel.Item className="carousel-item">
				<div className="grid">
					<h1 className="header center">DESCRIPTION</h1>
					<input
						type="text"
						placeholder="TITLE"
						id="title-field"
						onChange={e => onChange(e, "title")}
					/>
					<textarea
						rows="10"
						cols="30"
						placeholder="Give a brief description about your offering"
						id="description-field"
						onChange={e => onChange(e, "description")}
					/>
				</div>
			</Carousel.Item>
			<Carousel.Item>
				<div className="grid">
					<h1 className="header center">DETAILS</h1>
					<select
						name="type"
						className="center"
						id="type-dropdown"
						defaultValue=""
						onChange={e => onChange(e, "type")}
					>
						<option value="" disabled>
							Choose Category..
						</option>
						<option value="lesson">Lesson</option>
						<option value="rent">Rent</option>
						<option value="sell">Sell</option>
					</select>
					<input
						type="number"
						name="cost"
						id="cost-field"
						className="center"
						placeholder="price"
						onChange={e => onChange(e, "cost")}
					/>
					<div className="center" id="tradeable-field">
						<input
							type="checkbox"
							name="isTradeable"
							id="is-tradeable-box"
							className="center"
							onClick={e => onChange(e, "isTradeable")}
						/>
						<label htmlFor="isTradeable">Allow Trade Offers?</label>
					</div>
					{type === "lesson" ? (
						<div id="input-duration">
							<div className="center" id="label-duration">
								Lesson Duration:
							</div>
							<button
								className="center"
								id="duration-minus"
								onClick={() => dur("decrease")}
							>
								-
							</button>
							<div id="duration-value" className="center">
								{durationValue(duration)}
							</div>
							<button
								className="center"
								id="duration-plus"
								onClick={() => dur("increase")}
							>
								+
							</button>
						</div>
					) : null}
				</div>
			</Carousel.Item>
			<Carousel.Item className="carousel-item">
				<div className="grid">
					<h1 className="header center">REVIEW</h1>
					<h2 id="summary-title">{title}</h2>
					<div id="summary-description">{description}</div>
					<div id="summary-type">Type: {type.toUpperCase()}</div>
					<div id="summary-cost">Price: {cost}</div>
					<div id="summary-tradeable">
						Allow Trade: {isTradeable.toString().toUpperCase()}
					</div>
					{type === "lesson" ? (
						<div id="summary-duration">
							<div>Duration: {durationValue(duration)}</div>
						</div>
					) : null}
					<button id="submit-button" onClick={() => submitOffer()}>
						SUBMIT
					</button>
				</div>
			</Carousel.Item>
		</Carousel>
	);
};

export default AddOffer;