import React, { useState } from "react";
import "./css/offerCard.css";
import uuid from "react-uuid";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { modifyOffer, getOffers, deleteOffer } from "../actions/offerActions";
import {
  getUser,
  modifyUser,
  addUserNotification,
} from "../actions/userActions";
import axios from "axios";
import { useEffect } from "react";

const OfferCard = (props) => {
  const [isActive, setActive] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [karma, setKarma] = useState("");
  const user = useSelector((state) => state.auth.user);
  const offer = props.offer;
  const dispatch = useDispatch();
  const levels = [
    {
      label: "BEGINNER",
      color: "rgb(89, 205, 144)",
    },
    {
      label: "INTERMEDIATE",
      color: "rgb(0, 166, 251)",
    },
    {
      label: "ADVANCED",
      color: "rgb(246, 81, 29)",
    },
    {
      label: "EXPERT",
      color: "rgb(241, 91, 181)",
    },
  ];

  useEffect(() => {
    axios
      .get("/api/users/" + props.offer.creator.id)
      .then((res) => {
        setKarma(res.data.karma);
      })
      .catch((err) => console.log(err));
  }, []);

  // Set profile pic, or default if none
  const profilePic = offer.creator.profile_picture
    ? offer.creator.profile_picture
    : "/default.png";

  // Get duration in right format
  const durationValue = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours + ":" + minutes + (minutes < 10 ? "0" : "") + " h";
  };

  // Handle buy of offer
  const handleBuy = () => {
    const buyer = JSON.stringify({
      buyer: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        profile_picture: user.profile_picture,
      },
      isActive: true,
    });

    const body = JSON.stringify({
      id: uuid(),
      type: "sale",
      offer: props.offer,
      buyer: {
        username: user.username,
        id: user._id,
        profile_picture: user.profile_picture,
      },
      isRead: false,
      date: Date.now(),
    });

    // Get seller money and add
    axios
      .get("/api/users/" + offer.creator.id)
      .then(
        modifyUser(user._id, {
          money: user.money - offer.cost,
        })
      )
      .then((res) => {
        modifyUser(offer.creator.id, {
          money: res.data.money + offer.cost,
        });
      })
      // Modify offer and user & refresh offerlist
      .then(modifyOffer(offer._id, buyer))
      .then(addUserNotification(offer.creator.id, body))
      .then(getOffers()(dispatch))
      .then(getUser(user._id)(dispatch))
      .then(setRedirect(true))
      .catch((err) => console.log(err));
  };

  // Handle offer delete
  const handleDelete = () => {
    deleteOffer(offer._id);
    getOffers()(dispatch);
  };

  // On complete offer handler
  const completeOffer = () => {
    props.toggleShow(true);
    props.toComplete(offer);
  };

  return redirect ? (
    <Redirect to="/" />
  ) : (
    <div>
      <div className="offer-card" onClick={() => setActive(!isActive)}>
        {props.myOffers ? (
          offer.isCompleted ? (
            <div
              id="is-completed-indicator"
              style={{ backgroundColor: "green" }}
            >
              COMPLETED
            </div>
          ) : (
            <div
              id="is-completed-indicator"
              style={{ backgroundColor: "blue" }}
            >
              ON SALE
            </div>
          )
        ) : null}
        <div className="offer-card-top">
          <img src={profilePic} alt="profilePic" id="profile-pic" />
          <div className="user-details">
            <div id="username">{offer.creator.username} | </div>
            <div className="karma-container">
              <img src="/karma.png" alt="karma" id="karma-icon" />
              <div id="karma">{karma}</div>
            </div>
            <div id="date">{offer.createdDate.substring(0, 10)}</div>
          </div>
        </div>
        <div id="title">{offer.title.toUpperCase()}</div>

        {isActive ? (
          !props.activeOffer ? (
            <div className="details-container">
              <div id="description">"{offer.description}"</div>
              {user && props.offer.creator.id === user._id ? (
                <div>
                  <div
                    id="delete-button"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are You Sure? This operation can not be undone."
                        )
                      ) {
                        handleDelete();
                      }
                    }}
                  >
                    DELETE
                  </div>
                </div>
              ) : (
                <div
                  id="buy-button"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Buy " +
                          offer.title.toUpperCase() +
                          " for " +
                          offer.cost +
                          "?"
                      )
                    ) {
                      handleBuy();
                    }
                  }}
                >
                  BUY
                </div>
              )}
            </div>
          ) : (
            <div className="active-buttons-container">
              <div
                className="active-button"
                id="active-complete"
                onClick={() => completeOffer()}
              >
                COMPLETE
              </div>
              <div id="active-report">Report</div>
            </div>
          )
        ) : null}
        <div className="offer-card-bottom">
          <img src="/money-bag.png" alt="money" id="cost-icon" />
          <div id="cost">{offer.cost}</div>
          <img src="/clock.png" alt="clock" id="duration-icon" />
          <div id="duration">{durationValue(offer.duration)}</div>
          <img src="/level.png" alt="level" id="level-icon" />
          <div
            id="level"
            style={{
              color: levels[offer.level].color,
            }}
          >
            {levels[offer.level].label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
