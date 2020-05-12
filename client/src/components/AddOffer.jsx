import React, { useState } from "react";
import { addOffer, getOffers } from "../actions/offerActions";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@material-ui/core/Slider";
import "./css/addOffer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router-dom";

const AddOffer = (props) => {
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState(0);
  const [duration, setDuration] = useState(30);
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState(0);
  const [ready, setReady] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const dur = (type) => {
    const sign = type === "increase" ? 1 : -1;
    if (sign < 0 && duration > 15) {
      setDuration(duration - 15);
    } else if (sign > 0 && duration < 240) {
      setDuration(duration + 15);
    }
  };

  const durationValue = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours + ":" + minutes + (minutes < 10 ? "0" : "") + " h";
  };

  const onChange = (e, type) => {
    switch (type) {
      case "level":
        console.log(e.target);
        //setLevel(e.target.aria-valuenow);
        break;
      case "cost":
        setCost(e.target.value);
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

  const handleSubmit = () => {
    // Get current user from state
    const creator = {
      id: user._id,
      username: user.username,
      karma: user.karma,
      profile_picture: user.profile_picture,
    };

    // Create expires date a week from now
    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    var date = new Date();
    const expiresDate = date.addDays(7);

    const offer = {
      creator,
      cost,
      level,
      expiresDate,
      description,
      duration,
      title,
    };

    addOffer(offer)(dispatch);
    getOffers()(dispatch);
    setReady(true);
  };

  return ready ? (
    <Redirect to="/" />
  ) : (
    <div>
      <div className="background" onClick={() => props.toggleAdd(false)}></div>
      <div className="addoffer-container">
        <div className="header">ADD NEW OFFER</div>
        <input
          type="text"
          placeholder="TITLE"
          id="title-field"
          onChange={(e) => onChange(e, "title")}
        />
        <textarea
          rows="6"
          cols="30"
          placeholder="Give a brief description about your offering"
          id="description-field"
          onChange={(e) => onChange(e, "description")}
        />
        <h2>{level}</h2>
        <Slider
          onChangeCommitted={(e) => onChange(e, "level")}
          aria-valuetext="value"
          defaultValue={3}
          step={1}
          marks
          min={0}
          max={5}
          valueLabelDisplay="auto"
        />
        <div id="input-duration">
          <div id="label-duration">Duration</div>
          <button id="duration-minus" onClick={() => dur("decrease")}>
            -
          </button>
          <div id="duration-value">{durationValue(duration)}</div>
          <button id="duration-plus" onClick={() => dur("increase")}>
            +
          </button>
        </div>
        <input
          type="number"
          name="cost"
          id="cost-field"
          className="center"
          placeholder="PRICE"
          onChange={(e) => onChange(e, "cost")}
        />
        <button id="submit-button" onClick={() => handleSubmit()}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default AddOffer;
