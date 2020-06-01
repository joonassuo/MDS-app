import React, { useState } from "react";
import axios from "axios";
import uuid from "react-uuid";
import OfferCard from "./OfferCard";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import Navbar from "./Navbar";
import Addoffer from "./AddOffer";
import "./css/Homepage.css";
import { modifyOffer, getOffers } from "../actions/offerActions";
import {
  getUser,
  modifyUser,
  addUserNotification,
} from "../actions/userActions";
import { Redirect } from "react-router-dom";
import { set } from "mongoose";

const Homepage = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [showCompletePopup, setShowCompletePopup] = useState(false);
  const [toComplete, setToComplete] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const offerList = useSelector((state) => state.offer.offers);
  const user = useSelector((state) => state.auth.user);

  // OFFER COMPLETION SCREEN POPUP
  const CompletePopup = () => {
    const [rating, setRating] = useState(0);

    // Get buyer or seller
    const isCreator = user._id === toComplete.creator.id ? true : false;
    const id = isCreator ? toComplete.buyer.id : toComplete.creator.id;
    let initialKarma;
    axios
      .get("/api/users/" + id)
      .then((res) => {
        initialKarma = res.data.karma;
      })
      .catch((err) => console.log(err));

    // HANDLE OFFER COMPLETION EVENT
    const handleCompletion = () => {
      if (rating === 0) {
        alert("Please enter rating");
        return;
      }

      // PUT offer body
      const offerBody = isCreator
        ? JSON.stringify({
            isActive: toComplete.creatorRating ? false : true,
            isCompleted: toComplete.creatorRating ? false : true,
            buyerRating: true,
          })
        : JSON.stringify({
            isActive: toComplete.buyerRating ? false : true,
            isCompleted: toComplete.buyerRating ? false : true,
            creatorRating: true,
          });

      // PUT user body
      const userBody = JSON.stringify({
        karma: initialKarma + rating * 2,
      });

      // PUT notification body
      const notificationBody = JSON.stringify({
        id: uuid(),
        type: "rating",
        text:
          user.username.toUpperCase() +
          " rated you " +
          rating +
          " stars for " +
          toComplete.title.toUpperCase() +
          "!",
        date: Date.now(),
      });

      // Make modifications and refresh user & offerlist
      modifyOffer(toComplete._id, offerBody);
      modifyUser(id, userBody);
      addUserNotification(id, notificationBody);
      getOffers()(dispatch);
      getUser(user._id)(dispatch);
      setShowCompletePopup(false);
    };

    const pic = isCreator
      ? toComplete.buyer.profile_picture
      : toComplete.creator.profile_picture;

    return (
      <div>
        <div
          className="complete-offer-background"
          onClick={() => {
            setShowCompletePopup(false);
          }}
        ></div>
        <div className="complete-offer-container">
          <div id="complete-title">{toComplete.title.toUpperCase()}</div>
          <div id="complete-pic-container">
            <img
              id="complete-pic"
              src={pic ? pic : "/default.png"}
              alt="profile-pic"
            />
          </div>
          <div>
            Please Rate{" "}
            {isCreator
              ? toComplete.buyer.username.toUpperCase()
              : toComplete.creator.username.toUpperCase()}
          </div>
          <div id="complete-star-container">
            <img
              className="complete-star"
              src={rating > 0 ? "/star_full.png" : "/star.png"}
              alt="star"
              onClick={() => setRating(1)}
            />
            <img
              className="complete-star"
              src={rating > 1 ? "/star_full.png" : "/star.png"}
              alt="star"
              onClick={() => setRating(2)}
            />
            <img
              className="complete-star"
              src={rating > 2 ? "/star_full.png" : "/star.png"}
              alt="star"
              onClick={() => setRating(3)}
            />
          </div>
          <div id="complete-submit" onClick={() => handleCompletion()}>
            SUBMIT
          </div>
          <div id="complete-cancel" onClick={() => setShowCompletePopup(false)}>
            CANCEL
          </div>
        </div>
      </div>
    );
  };

  return isLogin ? (
    <Redirect to="/login" />
  ) : (
    <div>
      <Navbar user={user} auth={isAuth} />
      {isAdd ? <Addoffer toggleAdd={setIsAdd} /> : null}
      {showCompletePopup ? <CompletePopup /> : null}
      <div className="navigation-bar">
        <div>Browse</div>
        <div>Active</div>
        <div>My offers</div>
      </div>
      <img
        src="/add.png"
        alt="plus"
        id="add-button"
        onClick={() => {
          if (isAuth) {
            setIsAdd(true);
          } else {
            if (window.confirm("Please login to add an offer")) {
              setIsLogin(true);
            }
          }
        }}
      />
      <Carousel classname="carousel" interval={null}>
        {/*
				--------------BROWSE ALL OFFERS---------------
				*/}
        <Carousel.Item id="carousel-browse">
          <div>
            {offerList ? (
              <div className="cards-container">
                {offerList
                  .filter((offer) => !offer.isActive && !offer.isCompleted)
                  .map((offer) => (
                    <OfferCard offer={offer} key={offer._id} />
                  ))}
              </div>
            ) : null}
          </div>
        </Carousel.Item>
        {/*
				-------------BROWSE ACTIVE OFFERS--------------
				*/}
        <Carousel.Item id="carousel-active">
          {user ? (
            <div>
              {offerList && user ? (
                <div className="cards-container">
                  {offerList
                    .filter(
                      (offer) =>
                        (offer.creator.id === user._id ||
                          offer.buyer.id === user._id) &&
                        offer.isActive
                    )
                    .map((offer) => (
                      <OfferCard
                        offer={offer}
                        key={offer._id}
                        toggleShow={setShowCompletePopup}
                        toComplete={setToComplete}
                        activeOffer={true}
                      />
                    ))}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="carousel-login-container">
              <div className="carousel-login-text">
                Login to view your content
              </div>
              <div
                className="carousel-login-button"
                onClick={() => setIsLogin(true)}
              >
                LOGIN
              </div>
            </div>
          )}
        </Carousel.Item>
        {/*
				--------------BROWSE YOUR OFFERS--------------
				*/}
        <Carousel.Item id="carousel-my-offers">
          {user ? (
            <div>
              {offerList && user ? (
                <div className="cards-container">
                  {offerList
                    .filter(
                      (offer) =>
                        offer.creator.id === user._id && !offer.isActive
                    )
                    .map((offer) => (
                      <OfferCard
                        offer={offer}
                        key={offer._id}
                        myOffers={true}
                      />
                    ))}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="carousel-login-container">
              <div className="carousel-login-text">
                Login to view your content
              </div>
              <div
                className="carousel-login-button"
                onClick={() => setIsLogin(true)}
              >
                LOGIN
              </div>
            </div>
          )}
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Homepage;
